import * as serviceRepository from "../repositories/service.repository.js";

export const createService = async (data) => {
  return serviceRepository.createService(data);
};

export const getAllServices = async (userId) => {
  return serviceRepository.getAllServices(userId);
};

export const getServiceById = async (id, userId) => {
  return serviceRepository.getServiceById(id, userId);
};

export const updateService = async (id, userId, data) => {
  return serviceRepository.updateService(id, userId, data);
};

export const deleteService = async (id, userId) => {
  return serviceRepository.deleteService(id, userId);
};