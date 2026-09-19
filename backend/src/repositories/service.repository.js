import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { services, projects } from "../db/schema.js";

export const createService = async (data) => {
  const [service] = await db
    .insert(services)
    .values(data)
    .returning();

  return service;
};

export const getAllServices = async (userId) => {
  return db
    .select({
      id: services.id,
      projectId: services.projectId,
      name: services.name,
      status: services.status,
      createdAt: services.createdAt,
    })
    .from(services)
    .innerJoin(projects, eq(services.projectId, projects.id))
    .where(eq(projects.userId, userId));
};

export const getServiceById = async (id, userId) => {
  const [service] = await db
    .select({
      id: services.id,
      projectId: services.projectId,
      name: services.name,
      status: services.status,
      createdAt: services.createdAt,
    })
    .from(services)
    .innerJoin(projects, eq(services.projectId, projects.id))
    .where(
      and(
        eq(services.id, id),
        eq(projects.userId, userId)
      )
    );

  return service;
};

export const updateService = async (id, userId, data) => {
  const [service] = await db
    .update(services)
    .set(data)
    .where(eq(services.id, id))
    .returning();

  if (!service) return undefined;

  // Verify ownership after update
  return getServiceById(service.id, userId);
};

export const deleteService = async (id, userId) => {
  const service = await getServiceById(id, userId);

  if (!service) return undefined;

  const [deletedService] = await db
    .delete(services)
    .where(eq(services.id, id))
    .returning();

  return deletedService;
};