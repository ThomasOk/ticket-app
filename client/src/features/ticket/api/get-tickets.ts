//import { initialTickets } from "@/data";
import { Ticket } from "../types";
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// export const getTickets = async (): Promise<Ticket[]> => {
// 	await new Promise((resolve) => setTimeout(resolve, 2000));

// 	//throw new Error("Failed to fetch tickets");

// 	return new Promise((resolve) => {
// 		resolve(initialTickets);
// 	});
// };

export const getTickets = (): Promise<Ticket[]> => {
	return api.get<Ticket[]>("/tickets");
};

export const useTickets = () => {
	return useQuery({
		queryKey: ["tickets"],
		queryFn: getTickets,
	});
};
