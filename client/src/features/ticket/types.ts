export type TicketStatus = "OPEN" | "DONE" | "IN_PROGRESS";

export type Ticket = {
	id: string;
	title: string;
	content: string;
	status: TicketStatus;
	createdAt: Date;
	updatedAt: Date;
	deadline: string;
	bounty: number;
};
