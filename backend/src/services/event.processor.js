import * as incidentRepository from "../repositories/incident.repository.js";

export const processEvent = async (event) => {
  const isCritical =
    event.level === "CRITICAL" ||
    event.type === "INCIDENT";

  if (!isCritical) {
    return {
      incidentCreated: false,
      incident: null,
      event,
    };
  }

  // Check for an existing open incident
  const existingIncident = await incidentRepository.findRecentIncident({
    projectId: event.projectId,
    serviceId: event.serviceId,
    title: event.message,
  });

  // Correlate with existing incident
  if (existingIncident) {
    return {
      incidentCreated: false,
      incident: existingIncident,
      correlated: true,
      event,
    };
  }

  // Create a new incident
  const incident = await incidentRepository.createIncident({
    projectId: event.projectId,
    serviceId: event.serviceId,
    title: event.message,
    description: `Automatically detected from ${event.type} event.`,
    severity: "CRITICAL",
    status: "OPEN",
  });

  return {
    incidentCreated: true,
    incident,
    correlated: false,
    event,
  };
};