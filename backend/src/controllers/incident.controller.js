import * as incidentService from "../services/incident.service.js";
import * as projectService from "../services/project.service.js";
import * as logService from "../services/log.service.js";
import * as serviceService from "../services/service.service.js";
import { analyzeIncidentWithAI } from "../services/ai.service.js";
import { db } from "../db/index.js";
import { desc, eq, and } from "drizzle-orm";
import { agentRuns, recoveryActions } from "../db/schema.js";


export const createIncident = async (req, res) => {
  try {
    const {
      projectId,
      serviceId,
      title,
      description,
      severity,
      status,
    } = req.body;

    if (!projectId || !title) {
      return res.status(400).json({
        success: false,
        message: "projectId and title are required",
      });
    }

    const project = await projectService.getProjectById(
      Number(projectId),
      req.user.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const incident = await incidentService.createIncident({
      projectId,
      serviceId,
      title,
      description,
      severity,
      status,
    });

    res.status(201).json({
      success: true,
      data: incident,
    });
  } catch (error) {
    console.error("Create incident error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create incident",
    });
  }
};

export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await incidentService.getAllIncidents(
      req.user.id
    );

    res.json({
      success: true,
      data: incidents,
    });
  } catch (error) {
    console.error("Get incidents error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents",
    });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const incident = await incidentService.getIncidentById(
      Number(req.params.id),
      req.user.id
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    console.error("Get incident error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incident",
    });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const incident = await incidentService.updateIncident(
      Number(req.params.id),
      req.user.id,
      req.body
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    console.error("Update incident error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update incident",
    });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    const incident = await incidentService.deleteIncident(
      Number(req.params.id),
      req.user.id
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    console.error("Delete incident error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete incident",
    });
  }
};


export const analyzeIncident = async (req, res) => {
  try {
    const incidentId = Number(req.params.id);

    if (!Number.isInteger(incidentId) || incidentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid incident ID",
      });
    }

    // Verify that the incident belongs to the authenticated user.
    const incident = await incidentService.getIncidentById(
      incidentId,
      req.user.id
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    // Retrieve logs using the existing ownership-safe service.
    const logs = await logService.getLogsByIncidentId(
      incidentId,
      req.user.id
    );

    // Resolve the actual service name when available.
    let service = "unknown";

    if (incident.serviceId) {
      const serviceRecord = await serviceService.getServiceById(
        incident.serviceId,
        req.user.id
      );

      if (serviceRecord) {
        service = serviceRecord.name;
      }
    }

    // Build the request expected by the FastAPI AI service.
    const aiInput = {
      incident_id: String(incident.id),
      service,
      description: [
        `Title: ${incident.title}`,
        `Severity: ${incident.severity ?? "unknown"}`,
        incident.description ?? "",
      ]
        .filter(Boolean)
        .join("\n"),
      logs: logs.map(
        (log) =>
          `${log.timestamp ?? ""} [${log.level}] ${log.message}`
      ),
    };

    // Run the Investigation -> Root Cause -> Recovery workflow.
    const analysis = await analyzeIncidentWithAI(aiInput);

    // Save the AI run and recommendation together.
    const saved = await db.transaction(async (tx) => {
      const [agentRun] = await tx
        .insert(agentRuns)
        .values({
          incidentId: incident.id,
          agentType: "INCIDENT_ANALYSIS",
          status: "COMPLETED",
          result: analysis,
          confidence:
            typeof analysis.confidence === "number"
              ? Math.round(analysis.confidence * 100)
              : null,
          completedAt: new Date(),
        })
        .returning();

      const [recoveryAction] = await tx
        .insert(recoveryActions)
        .values({
          incidentId: incident.id,
          action: analysis.recovery_recommendation,
          reason:
            analysis.reasoning ??
            analysis.probable_root_cause ??
            "AI-generated recovery recommendation",
          status: "PENDING",
        })
        .returning();

      return { agentRun, recoveryAction };
    });

    return res.status(200).json({
      success: true,
      message: "Incident analyzed successfully",
      data: {
        analysis,
        agentRun: saved.agentRun,
        recoveryAction: saved.recoveryAction,
      },
    });
  } catch (error) {
    console.error("Analyze incident error:", error);

    const isAIServiceError = error.message?.startsWith(
      "AI service returned"
    );

    return res.status(isAIServiceError ? 502 : 500).json({
      success: false,
      message: isAIServiceError
        ? "AI analysis service failed"
        : "Failed to analyze incident",
    });
  }
};


export const getIncidentAnalysis = async (req, res) => {
  try {
    const incidentId = Number(req.params.id);

    if (!Number.isInteger(incidentId) || incidentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid incident ID",
      });
    }

    // Verify incident ownership before returning saved analysis.
    const incident = await incidentService.getIncidentById(
      incidentId,
      req.user.id
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    const [agentRun] = await db
      .select()
      .from(agentRuns)
      .where(
        and(
          eq(agentRuns.incidentId, incidentId),
          eq(agentRuns.status, "COMPLETED"),
          eq(agentRuns.agentType, "INCIDENT_ANALYSIS")
        )
      )
      .orderBy(desc(agentRuns.completedAt), desc(agentRuns.id))
      .limit(1);

    if (!agentRun) {
      return res.json({
        success: true,
        data: null,
      });
    }

    const [recoveryAction] = await db
      .select()
      .from(recoveryActions)
      .where(eq(recoveryActions.incidentId, incidentId))
      .orderBy(desc(recoveryActions.createdAt), desc(recoveryActions.id))
      .limit(1);

    return res.json({
      success: true,
      data: {
        analysis: agentRun.result,
        agentRun,
        recoveryAction: recoveryAction ?? null,
      },
    });
  } catch (error) {
    console.error("Get incident analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved analysis",
    });
  }
};
