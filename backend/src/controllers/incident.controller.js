import * as incidentService from "../services/incident.service.js";
import * as projectService from "../services/project.service.js";


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