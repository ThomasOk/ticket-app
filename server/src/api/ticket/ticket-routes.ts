import express from "express";
import * as ticketHandlers from "./ticket-handlers";
import { validateRequest } from "../../middleware/validate";
import { insertTicketSchema } from "../../db/schema/ticket";
import { asyncHandler } from "@/utils/async-handler";

const router = express.Router();

router.get("/", asyncHandler(ticketHandlers.getAllTickets));
router.get("/:id", asyncHandler(ticketHandlers.getTicketById));
router.post(
	"/",
	validateRequest(insertTicketSchema),
	asyncHandler(ticketHandlers.createTicket)
);
router.patch(
	"/:id",
	validateRequest(insertTicketSchema.partial()),
	asyncHandler(ticketHandlers.updateTicket)
);
router.delete("/:id", asyncHandler(ticketHandlers.deleteTicket));

export default router;
