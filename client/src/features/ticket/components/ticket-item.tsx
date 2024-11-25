import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type TicketItemProps = {
	ticket: Ticket;
	isDetail?: boolean;
};

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
	console.log("ticket item log");
	const detailButton = (
		<Button variant="outline" size="icon" asChild>
			<Link to={paths.app.ticket.getHref(ticket.id)}>
				<LucideSquareArrowOutUpRight />
			</Link>
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
			</Card>
			{isDetail ? null : (
				<div className="flex flex-col gap-y-1">{detailButton}</div>
			)}
		</div>
	);
};
