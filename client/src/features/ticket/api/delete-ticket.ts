import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const deleteTicket = (ticketId: string) => {
	return api.delete(`/tickets/${ticketId}`);
};

export const useDeleteTicket = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTicket,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tickets"] });
		},
	});
};
