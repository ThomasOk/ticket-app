import { desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { ticketTable, NewTicket, Ticket } from "../../db/schema/ticket";
import { toCent } from "@/utils/currency";

export const getAllTickets = async (): Promise<Ticket[]> => {
	return await db
		.select()
		.from(ticketTable)
		.orderBy(desc(ticketTable.createdAt));
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
	const result = await db
		.select()
		.from(ticketTable)
		.where(eq(ticketTable.id, id));
	return result[0] || null;
};

export const createTicket = async (newTicket: NewTicket): Promise<Ticket> => {
	const dbData = {
		...newTicket,
		bounty: toCent(newTicket.bounty),
	};
	const result = await db.insert(ticketTable).values(newTicket).returning();
	return result[0];
};

export const updateTicket = async (
	id: string,
	updateData: Partial<NewTicket>
): Promise<Ticket | null> => {
	const dbData = {
		...updateData,
		bounty: updateData.bounty ? toCent(updateData.bounty) : undefined,
		updatedAt: new Date(),
	};
	const result = await db
		.update(ticketTable)
		.set(updateData)
		.where(eq(ticketTable.id, id))
		.returning();
	return result[0] || null;
};

export const deleteTicket = async (id: string): Promise<boolean> => {
	const result = await db
		.delete(ticketTable)
		.where(eq(ticketTable.id, id))
		.returning();
	return result.length > 0;
};
