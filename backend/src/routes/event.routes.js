import express from "express";

import {
  createEvent,
  getEventsByProjectId,
  getEventsByServiceId,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);

router.get("/project/:projectId", getEventsByProjectId);

router.get("/service/:serviceId", getEventsByServiceId);

export default router;