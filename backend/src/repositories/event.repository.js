import { and, desc, eq } from "drizzle-orm";

import { db } from "../db/index.js";
import {
  events,
  incidents,
  projects,
} from "../db/schema.js";

export const createEvent = async (data) => {
  const [event] = await db
    .insert(events)
    .values(data)
    .returning();

  return event;
};

export const attachEventToIncident = async (eventId, incidentId) => {
  const [event] = await db
    .update(events)
    .set({ incidentId })
    .where(eq(events.id, eventId))
    .returning();

  return event;
};

export const getEventsByProjectId = async (projectId, userId) => {
  return db
    .select({
      id: events.id,
      projectId: events.projectId,
      serviceId: events.serviceId,
      type: events.type,
      level: events.level,
      message: events.message,
      metadata: events.metadata,
      timestamp: events.timestamp,
    })
    .from(events)
    .innerJoin(
      projects,
      eq(events.projectId, projects.id)
    )
    .where(
      and(
        eq(events.projectId, projectId),
        eq(projects.userId, userId)
      )
    )
    .orderBy(desc(events.timestamp));
};

export const getEventsByServiceId = async (serviceId, userId) => {
  return db
    .select({
      id: events.id,
      projectId: events.projectId,
      serviceId: events.serviceId,
      type: events.type,
      level: events.level,
      message: events.message,
      metadata: events.metadata,
      timestamp: events.timestamp,
    })
    .from(events)
    .innerJoin(
      projects,
      eq(events.projectId, projects.id)
    )
    .where(
      and(
        eq(events.serviceId, serviceId),
        eq(projects.userId, userId)
      )
    )
    .orderBy(desc(events.timestamp));
};

export const getEventsByIncidentId = async (incidentId, userId) => {
  return db
    .select({
      id: events.id,
      projectId: events.projectId,
      serviceId: events.serviceId,
      incidentId: events.incidentId,
      type: events.type,
      level: events.level,
      message: events.message,
      metadata: events.metadata,
      timestamp: events.timestamp,
    })
    .from(events)
    .innerJoin(incidents, eq(events.incidentId, incidents.id))
    .innerJoin(projects, eq(incidents.projectId, projects.id))
    .where(
      and(
        eq(events.incidentId, incidentId),
        eq(projects.userId, userId)
      )
    )
    .orderBy(desc(events.timestamp));
};