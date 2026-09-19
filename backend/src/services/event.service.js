import * as eventRepository from "../repositories/event.repository.js";

export const createEvent = async (data) => {
  return await eventRepository.createEvent(data);
};

export const getEventsByProjectId = async (projectId) => {
  return await eventRepository.getEventsByProjectId(projectId);
};

export const getEventsByServiceId = async (serviceId) => {
  return await eventRepository.getEventsByServiceId(serviceId);
};