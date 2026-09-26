import * as eventService from "../services/event.service.js";
import * as projectService from "../services/project.service.js";

export const createEvent = async (req, res) => {
  try {
    const {
      projectId,
      serviceId,
      type,
      level,
      message,
      metadata,
    } = req.body;

    if (!projectId || !type || !level || !message) {
      return res.status(400).json({
        success: false,
        message:
          "projectId, type, level and message are required",
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

    const result = await eventService.createEvent({
      projectId,
      serviceId,
      type,
      level,
      message,
      metadata,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

export const getEventsByProjectId = async (req, res) => {
  try {
    const events = await eventService.getEventsByProjectId(
      Number(req.params.projectId),
      req.user.id
    );

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get project events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project events",
    });
  }
};

export const getEventsByServiceId = async (req, res) => {
  try {
    const events = await eventService.getEventsByServiceId(
      Number(req.params.serviceId),
      req.user.id
    );

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get service events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service events",
    });
  }
};