import express from "express";

import {
  createLog,
  getLogsByIncidentId,
  getLogById,
  deleteLog,
} from "../controllers/log.controller.js";

const router = express.Router();

router.post("/", createLog);
router.get("/incident/:incidentId", getLogsByIncidentId);
router.get("/:id", getLogById);
router.delete("/:id", deleteLog);

export default router;