import * as incidentRepository from "../repositories/incident.repository.js";

export const processEvent = async (event) => {
  const isCritical =
    event.level === "CRITICAL" ||
    event.type === "INCIDENT";

  if (!isCritical) {
    return {
      incidentCreated: false,
      event,
    };
  }

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
    event,
  };
};