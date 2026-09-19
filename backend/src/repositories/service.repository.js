import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { services } from "../db/schema.js";

export const createService = async (data) => {
  const [service] = await db
    .insert(services)
    .values(data)
    .returning();

  return service;
};

export const getAllServices = async () => {
  return await db.select().from(services);
};

export const getServiceById = async (id) => {
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, id));

  return service;
};

export const updateService = async (id, data) => {
  const [service] = await db
    .update(services)
    .set(data)
    .where(eq(services.id, id))
    .returning();

  return service;
};

export const deleteService = async (id) => {
  const [service] = await db
    .delete(services)
    .where(eq(services.id, id))
    .returning();

  return service;
};