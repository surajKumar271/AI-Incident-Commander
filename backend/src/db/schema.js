import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  }).notNull().unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  description: text("description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),

  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  status: varchar("status", {
    length: 30,
  }).default("HEALTHY").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Incidents
export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),

  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id),

  serviceId: integer("service_id")
    .references(() => services.id),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text("description"),

  severity: varchar("severity", {
    length: 20,
  }).default("MEDIUM").notNull(),

  status: varchar("status", {
    length: 30,
  }).default("OPEN").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  resolvedAt: timestamp("resolved_at"),
});

// Logs
export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),

  incidentId: integer("incident_id")
    .notNull()
    .references(() => incidents.id),

  level: varchar("level", {
    length: 20,
  }).notNull(),

  message: text("message").notNull(),

  metadata: jsonb("metadata"),

  timestamp: timestamp("timestamp").defaultNow().notNull(),
});


// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),

  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id),

  serviceId: integer("service_id")
    .references(() => services.id),

  type: varchar("type", { length: 30 }).notNull(),

  level: varchar("level", { length: 20 }).notNull(),

  message: text("message").notNull(),

  metadata: jsonb("metadata"),

  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Agent Runs
export const agentRuns = pgTable("agent_runs", {
  id: serial("id").primaryKey(),

  incidentId: integer("incident_id")
    .notNull()
    .references(() => incidents.id),

  agentType: varchar("agent_type", {
    length: 50,
  }).notNull(),

  status: varchar("status", {
    length: 30,
  }).default("RUNNING").notNull(),

  result: jsonb("result"),

  confidence: integer("confidence"),

  startedAt: timestamp("started_at").defaultNow().notNull(),

  completedAt: timestamp("completed_at"),
});

// Recovery Actions
export const recoveryActions = pgTable("recovery_actions", {
  id: serial("id").primaryKey(),

  incidentId: integer("incident_id")
    .notNull()
    .references(() => incidents.id),

  action: text("action").notNull(),

  reason: text("reason"),

  riskLevel: varchar("risk_level", {
    length: 20,
  }),

  status: varchar("status", {
    length: 30,
  }).default("PENDING").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  executedAt: timestamp("executed_at"),
});