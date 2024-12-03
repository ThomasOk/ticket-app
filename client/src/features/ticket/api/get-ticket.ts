import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Ticket } from "../types";

export const getTicket = (ticketId: string) => {
	return api.get<Ticket>(`/tickets/${ticketId}`);
};

export const useTicket = (ticketId: string) => {
	return useQuery({
		queryKey: ["tickets", ticketId],
		queryFn: () => getTicket(ticketId),
	});
};
