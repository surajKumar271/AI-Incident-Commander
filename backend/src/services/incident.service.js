import * as incidentRepository from "../repositories/incident.repository.js";

export const createIncident = async (data) => {
  return incidentRepository.createIncident(data);
};

export const getAllIncidents = async (userId) => {
  return incidentRepository.getAllIncidents(userId);
};

export const getIncidentById = async (id, userId) => {
  return incidentRepository.getIncidentById(id, userId);
};

export const updateIncident = async (id, userId, data) => {
  return incidentRepository.updateIncident(
    id,
    userId,
    data
  );
};

export const deleteIncident = async (id, userId) => {
  return incidentRepository.deleteIncident(
    id,
    userId
  );
};