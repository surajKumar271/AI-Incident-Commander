import express from "express";

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

export default router;