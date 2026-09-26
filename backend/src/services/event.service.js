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

export const getEventsByProjectId = async (projectId, userId) => {
  return eventRepository.getEventsByProjectId(
    projectId,
    userId
  );
};

export const getEventsByServiceId = async (serviceId, userId) => {
  return eventRepository.getEventsByServiceId(
    serviceId,
    userId
  );
};