import { desc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { events } from "../db/schema.js";

export const createEvent = async (data) => {
  const [event] = await db
    .insert(events)
    .values(data)
    .returning();

  return event;
};

export const getEventsByProjectId = async (projectId) => {
  return await db
    .select()
    .from(events)
    .where(eq(events.projectId, projectId))
    .orderBy(desc(events.timestamp));
};

export const getEventsByServiceId = async (serviceId) => {
  return await db
    .select()
    .from(events)
    .where(eq(events.serviceId, serviceId))
    .orderBy(desc(events.timestamp));
};