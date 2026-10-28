import * as eventRepository from "../repositories/event.repository.js";
import { processEvent } from "./event.processor.js";

export const createEvent = async (data) => {
  const event = await eventRepository.createEvent(data);

  const result = await processEvent(event);

  let updatedEvent = event;

  if (result.incident) {
    updatedEvent = await eventRepository.attachEventToIncident(
      event.id,
      result.incident.id
    );
  }

  return {
    event: updatedEvent,
    incident: result.incident || null,
    incidentCreated: result.incidentCreated,
    correlated: result.correlated || false,
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

export const getEventsByIncidentId = async (incidentId, userId) =>
  eventRepository.getEventsByIncidentId(incidentId, userId);