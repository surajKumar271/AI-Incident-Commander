import * as incidentService from "../services/incident.service.js";

export const createIncident = async (req, res) => {
  try {
    const incident = await incidentService.createIncident(req.body);

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
    const incidents = await incidentService.getAllIncidents();

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
    const id = Number(req.params.id);

    const incident = await incidentService.getIncidentById(id);

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
    const id = Number(req.params.id);

    const incident = await incidentService.updateIncident(
      id,
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
    const id = Number(req.params.id);

    const incident = await incidentService.deleteIncident(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      message: "Incident deleted successfully",
    });
  } catch (error) {
    console.error("Delete incident error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete incident",
    });
  }
};