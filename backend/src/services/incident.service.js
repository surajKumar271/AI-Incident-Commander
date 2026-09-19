import * as incidentRepository from "../repositories/incident.repository.js";

export const createIncident = async (data) => {
  return await incidentRepository.createIncident(data);
};

export const getAllIncidents = async () => {
  return await incidentRepository.getAllIncidents();
};

export const getIncidentById = async (id) => {
  return await incidentRepository.getIncidentById(id);
};

export const updateIncident = async (id, data) => {
  return await incidentRepository.updateIncident(id, data);
};

export const deleteIncident = async (id) => {
  return await incidentRepository.deleteIncident(id);
};