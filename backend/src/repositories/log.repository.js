import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { logs } from "../db/schema.js";

export const createLog = async (data) => {
  const [log] = await db
    .insert(logs)
    .values(data)
    .returning();

  return log;
};

export const getLogsByIncidentId = async (incidentId) => {
  return await db
    .select()
    .from(logs)
    .where(eq(logs.incidentId, incidentId));
};

export const getLogById = async (id) => {
  const [log] = await db
    .select()
    .from(logs)
    .where(eq(logs.id, id));

  return log;
};

export const deleteLog = async (id) => {
  const [log] = await db
    .delete(logs)
    .where(eq(logs.id, id))
    .returning();

  return log;
};