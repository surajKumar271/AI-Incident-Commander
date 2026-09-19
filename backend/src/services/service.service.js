import * as serviceRepository from "../repositories/service.repository.js";

export const createService = async (data) => {
  return await serviceRepository.createService(data);
};

export const getAllServices = async () => {
  return await serviceRepository.getAllServices();
};

export const getServiceById = async (id) => {
  return await serviceRepository.getServiceById(id);
};

export const updateService = async (id, data) => {
  return await serviceRepository.updateService(id, data);
};

export const deleteService = async (id) => {
  return await serviceRepository.deleteService(id);
};