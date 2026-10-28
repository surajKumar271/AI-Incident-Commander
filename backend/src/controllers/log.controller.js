import * as logService from "../services/log.service.js";
import * as incidentService from "../services/incident.service.js";

export const createLog = async (req, res) => {
  try {
    const {
      incidentId,
      level,
      message,
      metadata,
    } = req.body;

    if (!incidentId || !level || !message) {
      return res.status(400).json({
        success: false,
        message: "incidentId, level and message are required",
      });
    }

    const incident = await incidentService.getIncidentById(
      Number(incidentId),
      req.user.id
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    const log = await logService.createLog({
      incidentId,
      level,
      message,
      metadata,
    });

    res.status(201).json({
      success: true,
      data: log,
    });
  } catch (error) {
    console.error("Create log error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create log",
    });
  }
};

export const getLogsByIncidentId = async (req, res) => {
  try {
    const logs = await logService.getLogsByIncidentId(
      Number(req.params.incidentId),
      req.user.id
    );

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error("Get logs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
    });
  }
};

export const getLogById = async (req, res) => {
  try {
    const log = await logService.getLogById(
      Number(req.params.id),
      req.user.id
    );

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Log not found",
      });
    }

    res.json({
      success: true,
      data: log,
    });
  } catch (error) {
    console.error("Get log error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch log",
    });
  }
};

export const deleteLog = async (req, res) => {
  try {
    const log = await logService.deleteLog(
      Number(req.params.id),
      req.user.id
    );

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Log not found",
      });
    }

    res.json({
      success: true,
      data: log,
    });
  } catch (error) {
    console.error("Delete log error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete log",
    });
  }
};