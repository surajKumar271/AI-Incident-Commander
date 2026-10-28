import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import eventRoutes from "./routes/event.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import logRoutes from "./routes/log.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Incident Commander Backend",
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/logs", logRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});