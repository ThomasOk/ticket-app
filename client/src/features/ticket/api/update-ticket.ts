import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Ticket } from "../types";
import { z } from "zod";

export const updateTicketInputSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
	deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
	bounty: z.coerce.number().positive(),
});

export type UpdateTicketInput = z.infer<typeof updateTicketInputSchema>;

type UpdateTicketParams = {
	ticketId: string;
	data: UpdateTicketInput;
};

export const updateTicket = ({
	ticketId,
	data,
}: UpdateTicketParams): Promise<Ticket> => {
	return api.patch(`/tickets/${ticketId}`, data);
};

export const useUpdateTicket = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateTicket,
		onSuccess: (_, { ticketId }) => {
			queryClient.invalidateQueries({ queryKey: ["tickets"] });
			queryClient.invalidateQueries({ queryKey: ["tickets", ticketId] });
		},
	});
};
