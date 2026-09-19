import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { incidents } from "../db/schema.js";

export const createIncident = async (data) => {
  const [incident] = await db
    .insert(incidents)
    .values(data)
    .returning();

  return incident;
};

export const getAllIncidents = async () => {
  return await db.select().from(incidents);
};

export const getIncidentById = async (id) => {
  const [incident] = await db
    .select()
    .from(incidents)
    .where(eq(incidents.id, id));

  return incident;
};

export const updateIncident = async (id, data) => {
  const [incident] = await db
    .update(incidents)
    .set(data)
    .where(eq(incidents.id, id))
    .returning();

  return incident;
};

export const deleteIncident = async (id) => {
  const [incident] = await db
    .delete(incidents)
    .where(eq(incidents.id, id))
    .returning();

  return incident;
};