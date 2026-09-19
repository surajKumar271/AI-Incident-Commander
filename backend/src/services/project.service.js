import * as projectRepository from "../repositories/project.repository.js";

export const createProject = async (data) => {
  return await projectRepository.createProject(data);
};

export const getAllProjects = async () => {
  return await projectRepository.getAllProjects();
};

export const getProjectById = async (id) => {
  return await projectRepository.getProjectById(id);
};

export const updateProject = async (id, data) => {
  return await projectRepository.updateProject(id, data);
};

export const deleteProject = async (id) => {
  return await projectRepository.deleteProject(id);
};