import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { projects } from "../db/schema.js";

export const createProject = async (data) => {
  const [project] = await db
    .insert(projects)
    .values(data)
    .returning();

  return project;
};

export const getAllProjects = async () => {
  return await db.select().from(projects);
};

export const getProjectById = async (id) => {
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id));

  return project;
};

export const updateProject = async (id, data) => {
  const [project] = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id))
    .returning();

  return project;
};

export const deleteProject = async (id) => {
  const [project] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning();

  return project;
};