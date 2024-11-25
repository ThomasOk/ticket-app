import { ContentLayout } from "@/components/layouts/content-layout";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { paths } from "@/config/paths";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { useEffect, useState } from "react";
import { Ticket } from "@/features/ticket/types";
import { getTicket } from "@/features/ticket/api/get-ticket";
import { Spinner } from "@/components/spinner";

// type TicketRouteProps = {
// 	params: {
// 		ticketId: string;
// 	};
// };

export const TicketRoute = () => {
	const { ticketId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [ticket, setTicket] = useState<Ticket | null>(null);

	useEffect(() => {
		const fetchTicket = async () => {
			if (ticketId) {
				const result = await getTicket(ticketId);
				setTicket(result);
				setIsLoading(false);
			}
		};
		fetchTicket();
	}, [ticketId]);

	//const ticket = tickets.find((ticket) => ticket.id === ticketId);

	// if (!ticket) {
	// 	return <div>Ticket not found</div>;
	// }

	return (
		<ContentLayout>
			{isLoading ? (
				<div className="flex-1 flex items-center justify-center">
					<Spinner />
				</div>
			) : !ticket ? (
				<div className="flex-1 flex">
					<Placeholder
						label="Ticket not found"
						button={
							<Button asChild variant="outline">
								<Link to={paths.app.tickets.path}>Go to tickets</Link>
							</Button>
						}
					/>
				</div>
			) : (
				<div className="flex justify-center animate-fade-in-from-top">
					<TicketItem ticket={ticket} isDetail={true} />
				</div>
			)}
		</ContentLayout>
	);
};
