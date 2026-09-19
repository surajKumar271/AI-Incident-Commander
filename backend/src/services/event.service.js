import * as eventRepository from "../repositories/event.repository.js";
import { processEvent } from "./event.processor.js";

export const createEvent = async (data) => {
  const event = await eventRepository.createEvent(data);

  const result = await processEvent(event);

  return {
    event,
    incident: result.incident || null,
    incidentCreated: result.incidentCreated,
  };
};

export const getEventsByProjectId = async (projectId) => {
  return await eventRepository.getEventsByProjectId(projectId);
};

export const getEventsByServiceId = async (serviceId) => {
  return await eventRepository.getEventsByServiceId(serviceId);
};