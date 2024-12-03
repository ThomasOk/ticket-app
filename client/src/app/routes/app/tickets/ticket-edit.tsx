import { CardCompact } from "@/components/card-compact";
import { ContentLayout } from "@/components/layouts/content-layout";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useTicket } from "@/features/ticket/api/get-ticket";
import { TicketUpdateForm } from "@/features/ticket/components/ticket-update-form";
import { Link, useParams } from "react-router-dom";

export const TicketEditRoute = () => {
	const { ticketId } = useParams();
	const { isLoading, error, data: ticket } = useTicket(ticketId!);

	return (
		<ContentLayout>
			{isLoading ? (
				<div className="flex-1 flex items-center justify-center">
					<Spinner />
				</div>
			) : error || !ticket ? (
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
				<div className="flex-1 flex flex-col justify-center items-center">
					<CardCompact
						title="Edit Ticket"
						description="Edit an existing ticket"
						className="w-full max-x-[420px] animate-fade-in-from-top"
						content={<TicketUpdateForm ticket={ticket} />}
					/>
				</div>
			)}
		</ContentLayout>
	);
};
