import { useEffect, useState } from "react";
import { Ticket } from "../types";
import { getTickets } from "../api/get-tickets";
import { TicketItem } from "./ticket-item";
import { Spinner } from "@/components/spinner";
import { Placeholder } from "@/components/placeholder";
import { LucideAlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TicketList = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [tickets, setTickets] = useState<Ticket[]>([]);

	const fetchTickets = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const result = await getTickets();
			setTickets(result);
		} catch (e) {
			setError(
				e instanceof Error ? e : new Error("An unexpected error occurred")
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	if (isLoading) return <Spinner />;

	if (error) {
		return (
			<Placeholder
				icon={<LucideAlertCircle />}
				label={error.message}
				button={
					<Button variant="outline" onClick={() => fetchTickets()}>
						Try Again
					</Button>
				}
			/>
		);
	}

	return (
		<div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
			{tickets.map((ticket) => (
				<TicketItem key={ticket?.id} ticket={ticket} />
			))}
		</div>
	);
};
