import express from "express";

import {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
  analyzeIncident,
  getIncidentAnalysis,
} from "../controllers/incident.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/:id/analyze", analyzeIncident);
router.get("/:id/analysis", getIncidentAnalysis);
router.post("/", createIncident);
router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);
router.patch("/:id", updateIncident);
router.delete("/:id", deleteIncident);

export default router;