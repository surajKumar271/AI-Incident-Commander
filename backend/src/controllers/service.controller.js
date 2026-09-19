import * as serviceService from "../services/service.service.js";
import * as projectService from "../services/project.service.js";

export const createService = async (req, res) => {
  try {
    const { projectId, name, status } = req.body;

    if (!projectId || !name) {
      return res.status(400).json({
        success: false,
        message: "projectId and name are required",
      });
    }

    const project = await projectService.getProjectById(
      Number(projectId),
      req.user.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const service = await serviceService.createService({
      projectId,
      name,
      status,
    });

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
    const services = await serviceService.getAllServices(req.user.id);

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
    const service = await serviceService.getServiceById(
      Number(req.params.id),
      req.user.id
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
    console.error("Get service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await serviceService.updateService(
      Number(req.params.id),
      req.user.id,
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
    const service = await serviceService.deleteService(
      Number(req.params.id),
      req.user.id
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
    console.error("Delete service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};