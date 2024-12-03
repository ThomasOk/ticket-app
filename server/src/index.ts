import express from "express";
import cors from "cors";
import ticketRoutes from "@/api/ticket/ticket-routes";
import { errorHandler } from "./middleware/error";
import { db } from "./db";
import { ticketTable } from "./db/schema/ticket";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tickets", ticketRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
	try {
		await db.select().from(ticketTable).limit(1);
		console.info("✅ Database connected successfully");
		console.info(`Server is running at http://localhost:${PORT}`);
	} catch (error) {
		console.error("❌ Failed to connect to database:", error);
		process.exit(1);
	}
});

export default app;
