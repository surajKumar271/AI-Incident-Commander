import { and, eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { logs, incidents, projects } from "../db/schema.js";

export const createLog = async (data) => {
  const [log] = await db
    .insert(logs)
    .values(data)
    .returning();

  return log;
};

export const getLogsByIncidentId = async (incidentId, userId) => {
  return db
    .select({
      id: logs.id,
      incidentId: logs.incidentId,
      level: logs.level,
      message: logs.message,
      metadata: logs.metadata,
      timestamp: logs.timestamp,
    })
    .from(logs)
    .innerJoin(
      incidents,
      eq(logs.incidentId, incidents.id)
    )
    .innerJoin(
      projects,
      eq(incidents.projectId, projects.id)
    )
    .where(
      and(
        eq(logs.incidentId, incidentId),
        eq(projects.userId, userId)
      )
    );
};

export const getLogById = async (id, userId) => {
  const [log] = await db
    .select({
      id: logs.id,
      incidentId: logs.incidentId,
      level: logs.level,
      message: logs.message,
      metadata: logs.metadata,
      timestamp: logs.timestamp,
    })
    .from(logs)
    .innerJoin(
      incidents,
      eq(logs.incidentId, incidents.id)
    )
    .innerJoin(
      projects,
      eq(incidents.projectId, projects.id)
    )
    .where(
      and(
        eq(logs.id, id),
        eq(projects.userId, userId)
      )
    );

  return log;
};

export const deleteLog = async (id, userId) => {
  const existingLog = await getLogById(id, userId);

  if (!existingLog) {
    return undefined;
  }

  const [log] = await db
    .delete(logs)
    .where(eq(logs.id, id))
    .returning();

  return log;
};