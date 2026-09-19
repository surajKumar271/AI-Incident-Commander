import * as eventService from "../services/event.service.js";

export const createEvent = async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);

    res.status(201).json({
      success: true,
      data: event,
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
    const projectId = Number(req.params.projectId);

    const events = await eventService.getEventsByProjectId(projectId);

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get project events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

export const getEventsByServiceId = async (req, res) => {
  try {
    const serviceId = Number(req.params.serviceId);

    const events = await eventService.getEventsByServiceId(serviceId);

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get service events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};