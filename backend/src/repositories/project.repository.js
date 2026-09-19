import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { projects } from "../db/schema.js";

export const createProject = async (data) => {
  const [project] = await db
    .insert(projects)
    .values(data)
    .returning();

  return project;
};

export const getAllProjects = async (userId) => {
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));
};

export const getProjectById = async (id, userId) => {
  const [project] = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, id),
        eq(projects.userId, userId)
      )
    );

  return project;
};

export const updateProject = async (id, userId, data) => {
  const [project] = await db
    .update(projects)
    .set(data)
    .where(
      and(
        eq(projects.id, id),
        eq(projects.userId, userId)
      )
    )
    .returning();

  return project;
};

export const deleteProject = async (id, userId) => {
  const [project] = await db
    .delete(projects)
    .where(
      and(
        eq(projects.id, id),
        eq(projects.userId, userId)
      )
    )
    .returning();

  return project;
};