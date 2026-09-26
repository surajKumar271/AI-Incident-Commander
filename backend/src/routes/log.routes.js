import express from "express";

import {
  createLog,
  getLogsByIncidentId,
  getLogById,
  deleteLog,
} from "../controllers/log.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createLog);
router.get("/incident/:incidentId", getLogsByIncidentId);
router.get("/:id", getLogById);
router.delete("/:id", deleteLog);

export default router;