import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Ticket } from "../types";
import { z } from "zod";

export const createTicketInputSchema = z.object({
	title: z.string().min(1, "Title is required").max(191),
	content: z.string().min(1, "Content is required").max(1024),
	deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
	bounty: z.coerce.number().positive(),
});

export type CreateTicketInput = z.infer<typeof createTicketInputSchema>;

export const createTicket = (data: CreateTicketInput): Promise<Ticket> => {
	return api.post("/tickets", data);
};

export const useCreateTicket = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTicket,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tickets"] });
		},
	});
};
