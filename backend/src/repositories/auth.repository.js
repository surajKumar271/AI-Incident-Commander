import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export const createUser = async (data) => {
  const [user] = await db
    .insert(users)
    .values(data)
    .returning();

  return user;
};

export const findUserByEmail = async (email) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  return user;
};

export const findUserById = async (id) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id));

  return user;
};