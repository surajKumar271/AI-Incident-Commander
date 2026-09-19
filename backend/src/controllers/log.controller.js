import * as logService from "../services/log.service.js";

export const createLog = async (req, res) => {
  try {
    const log = await logService.createLog(req.body);

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
    const incidentId = Number(req.params.incidentId);

    const logs = await logService.getLogsByIncidentId(incidentId);

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error("Get incident logs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
    });
  }
};

export const getLogById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const log = await logService.getLogById(id);

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
    const id = Number(req.params.id);

    const log = await logService.deleteLog(id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Log not found",
      });
    }

    res.json({
      success: true,
      message: "Log deleted successfully",
    });
  } catch (error) {
    console.error("Delete log error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete log",
    });
  }
};