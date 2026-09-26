import express from "express";

import {
  createEvent,
  getEventsByProjectId,
  getEventsByServiceId,
} from "../controllers/event.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createEvent);

router.get(
  "/project/:projectId",
  getEventsByProjectId
);

router.get(
  "/service/:serviceId",
  getEventsByServiceId
);

export default router;