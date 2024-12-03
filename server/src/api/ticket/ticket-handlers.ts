import { Request, Response } from "express";
import * as ticketService from "./ticket-service";
import { insertTicketSchema } from "../../db/schema/ticket";
import { AppError } from "@/utils/error";
import { StatusCodes } from "http-status-codes";

export const getAllTickets = async (_req: Request, res: Response) => {
	const tickets = await ticketService.getAllTickets();
	res.json(tickets);
};

export const getTicketById = async (req: Request, res: Response) => {
	const ticket = await ticketService.getTicketById(req.params.id);
	if (!ticket) {
		throw new AppError(StatusCodes.NOT_FOUND, "Ticket not found");
	}
	res.json(ticket);
};

export const createTicket = async (req: Request, res: Response) => {
	const validatedData = insertTicketSchema.parse(req.body);
	const newTicket = await ticketService.createTicket(validatedData);
	res.status(StatusCodes.CREATED).json(newTicket);
};

export const updateTicket = async (req: Request, res: Response) => {
	const validatedData = insertTicketSchema.partial().parse(req.body);
	const updatedTicket = await ticketService.updateTicket(
		req.params.id,
		validatedData
	);
	if (!updatedTicket) {
		throw new AppError(StatusCodes.NOT_FOUND, "Ticket not found");
	}
	res.json(updatedTicket);
};

export const deleteTicket = async (req: Request, res: Response) => {
	const isDeleted = await ticketService.deleteTicket(req.params.id);
	if (!isDeleted) {
		throw new AppError(StatusCodes.NOT_FOUND, "Ticket not found");
	}
	res.status(StatusCodes.NO_CONTENT).send();
};
