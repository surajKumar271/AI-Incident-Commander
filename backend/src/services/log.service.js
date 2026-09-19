import * as logRepository from "../repositories/log.repository.js";

export const createLog = async (data) => {
  return await logRepository.createLog(data);
};

export const getLogsByIncidentId = async (incidentId) => {
  return await logRepository.getLogsByIncidentId(incidentId);
};

export const getLogById = async (id) => {
  return await logRepository.getLogById(id);
};

export const deleteLog = async (id) => {
  return await logRepository.deleteLog(id);
};