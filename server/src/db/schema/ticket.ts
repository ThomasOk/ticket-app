import {
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Définition de l'enum TicketStatus
export const ticketStatus = pgEnum("ticket_status", [
	"OPEN",
	"IN_PROGRESS",
	"DONE",
]);

// Définition de la table ticket
export const ticketTable = pgTable("ticket", {
	//id: text("id").primaryKey().notNull(),
	id: uuid("id").defaultRandom().primaryKey(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	title: text("title").notNull(),
	content: varchar("content", { length: 1024 }).notNull(),
	status: ticketStatus("status").default("OPEN").notNull(),
	deadline: varchar("deadline", { length: 10 }).notNull(), // Length 10 pour format YYYY-MM-DD
	bounty: integer("bounty").notNull(),
});

// Schémas Zod pour la validation
export const selectTicketSchema = createSelectSchema(ticketTable);
export const insertTicketSchema = createInsertSchema(ticketTable, {
	id: z.string().optional(), // Optional car il sera généré automatiquement
	createdAt: z.date().optional(), // Optional car il sera généré automatiquement
	updatedAt: z.date().optional(), // Optional car il sera généré automatiquement
	title: z.string().min(1),
	content: z.string().max(1024),
	status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).default("OPEN"),
	deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
	bounty: z.coerce.number().positive(),
});
export const updateTicketSchema = z.object({
	title: z.string().min(1).optional(),
	content: z.string().max(1024).optional(),
	status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).optional(),
	deadline: z.string().optional(),
	bounty: z.number().positive().optional(),
});
// Types TypeScript déduits des schémas
export type Ticket = z.infer<typeof selectTicketSchema>;
export type NewTicket = z.infer<typeof insertTicketSchema>;
