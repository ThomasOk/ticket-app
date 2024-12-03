import clsx from "clsx";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";
import {
	LucidePencil,
	LucideSquareArrowOutUpRight,
	LucideTrash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteTicket, useDeleteTicket } from "../api/delete-ticket";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toCurrencyFromCent } from "@/utils/currency";

type TicketItemProps = {
	ticket: Ticket;
	isDetail?: boolean;
};

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
	const navigate = useNavigate();
	const deleteTicketMutation = useDeleteTicket();

	const detailButton = (
		<Button variant="outline" size="icon" asChild>
			<Link to={paths.app.ticket.getHref(ticket.id)}>
				<LucideSquareArrowOutUpRight />
			</Link>
		</Button>
	);

	const editButton = (
		<Button variant="outline" size="icon" asChild>
			<Link to={paths.app.ticketEdit.getHref(ticket.id)}>
				<LucidePencil className="h-4 w-4" />
			</Link>
		</Button>
	);

	const handleDeleteTicket = async () => {
		try {
			await deleteTicketMutation.mutateAsync(ticket.id);
			navigate(paths.app.tickets.path);
			toast.success("Ticket deleted successfully");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to delete ticket"
			);
			console.error("Failed to delete ticket: ", error);
		}
	};

	const deleteButton = (
		<Button variant="outline" size="icon" onClick={handleDeleteTicket}>
			<LucideTrash className="h-4 w-4" />
		</Button>
	);

	return (
		<div
			className={clsx("w-full  flex gap-x-1", {
				"max-w-[580px]": isDetail,
				"max-w-[420px]": !isDetail,
			})}
		>
			<Card className="w-full ">
				<CardHeader>
					<CardTitle className="flex gap-x-2">
						<span>{TICKET_ICONS[ticket.status]}</span>
						<span className="truncate">{ticket.title}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<span
						className={clsx("whitespace-break-spaces", {
							"line-clamp-3": !isDetail,
						})}
					>
						{ticket.content}
					</span>
				</CardContent>
				<CardFooter className="flex justify-between">
					<p className="text-sm text-muted-foreground">{ticket.deadline}</p>
					<p className="text-sm text-muted-foreground">
						{toCurrencyFromCent(ticket.bounty)}
					</p>
				</CardFooter>
			</Card>
			<div className="flex flex-col gap-y-1">
				{isDetail ? (
					<>
						{editButton} {deleteButton}
					</>
				) : (
					<>
						{detailButton}
						{editButton}
					</>
				)}
			</div>
		</div>
	);
};
