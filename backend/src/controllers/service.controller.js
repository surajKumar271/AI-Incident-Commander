import * as serviceService from "../services/service.service.js";

export const createService = async (req, res) => {
  try {
    const service = await serviceService.createService(req.body);

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const service = await serviceService.getServiceById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const service = await serviceService.updateService(
      id,
      req.body
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const service = await serviceService.deleteService(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};