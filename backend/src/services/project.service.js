import * as projectRepository from "../repositories/project.repository.js";

export const createProject = async (data) => {
  return projectRepository.createProject(data);
};

export const getAllProjects = async (userId) => {
  return projectRepository.getAllProjects(userId);
};

export const getProjectById = async (id, userId) => {
  return projectRepository.getProjectById(id, userId);
};

export const updateProject = async (id, userId, data) => {
  return projectRepository.updateProject(id, userId, data);
};

export const deleteProject = async (id, userId) => {
  return projectRepository.deleteProject(id, userId);
};