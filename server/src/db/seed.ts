import { db } from "./index";
import { ticketTable } from "./schema";

const tickets = [
	{
		title: "Ticket 1",
		content: "First ticket from DB.",
		status: "DONE" as const,
		//deadline: "2024-12-31",
		deadline: new Date().toISOString().split("T")[0],
		bounty: 499,
	},
	{
		title: "Ticket 2",
		content: "Second ticket from DB.",
		status: "OPEN" as const,
		deadline: new Date().toISOString().split("T")[0],
		bounty: 399,
	},
	{
		title: "Ticket 3",
		content: "Third ticket from DB.",
		status: "IN_PROGRESS" as const,
		deadline: new Date().toISOString().split("T")[0],
		bounty: 599,
	},
];

const seed = async () => {
	const t0 = performance.now();
	console.log("DB Seed: Started ...");

	try {
		// Supprime tous les tickets existants
		await db.delete(ticketTable);

		// Insère les nouveaux tickets
		await db.insert(ticketTable).values(tickets);

		const t1 = performance.now();
		console.log(`DB Seed: Finished (${t1 - t0}ms)`);
	} catch (error) {
		console.error("Error during seeding:", error);
		process.exit(1);
	}
};

seed()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
