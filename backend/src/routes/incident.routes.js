import express from "express";

import {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
} from "../controllers/incident.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createIncident);
router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);
router.patch("/:id", updateIncident);
router.delete("/:id", deleteIncident);

export default router;