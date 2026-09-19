import * as projectService from "../services/project.service.js";

export const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const project = await projectService.getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const project = await projectService.updateProject(
      id,
      req.body
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const project = await projectService.deleteProject(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};