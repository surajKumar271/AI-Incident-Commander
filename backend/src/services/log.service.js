import * as logRepository from "../repositories/log.repository.js";

export const createLog = async (data) => {
  return logRepository.createLog(data);
};

export const getLogsByIncidentId = async (incidentId, userId) => {
  return logRepository.getLogsByIncidentId(
    incidentId,
    userId
  );
};

export const getLogById = async (id, userId) => {
  return logRepository.getLogById(id, userId);
};

export const deleteLog = async (id, userId) => {
  return logRepository.deleteLog(id, userId);
};