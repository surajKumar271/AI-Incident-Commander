import { and, desc, eq, gt } from "drizzle-orm";

import { db } from "../db/index.js";
import { incidents, projects } from "../db/schema.js";

export const createIncident = async (data) => {
  const [incident] = await db
    .insert(incidents)
    .values(data)
    .returning();

  return incident;
};

export const getAllIncidents = async (userId) => {
  return db
    .select({
      id: incidents.id,
      projectId: incidents.projectId,
      serviceId: incidents.serviceId,
      title: incidents.title,
      description: incidents.description,
      severity: incidents.severity,
      status: incidents.status,
      createdAt: incidents.createdAt,
      resolvedAt: incidents.resolvedAt,
    })
    .from(incidents)
    .innerJoin(
      projects,
      eq(incidents.projectId, projects.id)
    )
    .where(eq(projects.userId, userId));
};

export const getIncidentById = async (id, userId) => {
  const [incident] = await db
    .select({
      id: incidents.id,
      projectId: incidents.projectId,
      serviceId: incidents.serviceId,
      title: incidents.title,
      description: incidents.description,
      severity: incidents.severity,
      status: incidents.status,
      createdAt: incidents.createdAt,
      resolvedAt: incidents.resolvedAt,
    })
    .from(incidents)
    .innerJoin(
      projects,
      eq(incidents.projectId, projects.id)
    )
    .where(
      and(
        eq(incidents.id, id),
        eq(projects.userId, userId)
      )
    );

  return incident;
};

export const updateIncident = async (id, userId, data) => {
  const existingIncident = await getIncidentById(id, userId);

  if (!existingIncident) return undefined;

  const [incident] = await db
    .update(incidents)
    .set(data)
    .where(eq(incidents.id, id))
    .returning();

  return incident;
};

export const deleteIncident = async (id, userId) => {
  const existingIncident = await getIncidentById(id, userId);

  if (!existingIncident) {
    return undefined;
  }

  const [incident] = await db
    .delete(incidents)
    .where(eq(incidents.id, id))
    .returning();

  return incident;
};

export const findRecentIncident = async ({
  projectId,
  serviceId,
  title,
}) => {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const [incident] = await db
    .select({
      id: incidents.id,
      projectId: incidents.projectId,
      serviceId: incidents.serviceId,
      title: incidents.title,
      description: incidents.description,
      severity: incidents.severity,
      status: incidents.status,
      createdAt: incidents.createdAt,
      resolvedAt: incidents.resolvedAt,
    })
    .from(incidents)
    .where(
      and(
        eq(incidents.projectId, projectId),
        eq(incidents.serviceId, serviceId),
        eq(incidents.title, title),
        eq(incidents.status, "OPEN"),
        gt(incidents.createdAt, thirtyMinutesAgo)
      )
    )
    .orderBy(desc(incidents.createdAt))
    .limit(1);

  return incident;
};