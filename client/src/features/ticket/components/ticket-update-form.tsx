// src/features/ticket/components/ticket-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/config/paths";
import {
	updateTicketInputSchema,
	useUpdateTicket,
	type UpdateTicketInput,
} from "../api/update-ticket";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Ticket } from "../types";
import { toast } from "sonner";
import { DatePicker } from "@/components/date-picker";
import { fromCent, toCent } from "@/utils/currency";

type ticketUpdateFormProps = {
	ticket: Ticket;
};

export const TicketUpdateForm = ({ ticket }: ticketUpdateFormProps) => {
	const navigate = useNavigate();
	const updateTicketMutation = useUpdateTicket();

	const form = useForm<UpdateTicketInput>({
		resolver: zodResolver(updateTicketInputSchema),
		defaultValues: {
			title: ticket.title,
			content: ticket.content,
			deadline: ticket.deadline,
			bounty: ticket.bounty ? fromCent(ticket.bounty) : 0,
		},
	});

	const onSubmit = async (data: UpdateTicketInput) => {
		try {
			await updateTicketMutation.mutateAsync({
				ticketId: ticket.id, // On ajoute l'ID du ticket
				data: data, // Les données du formulaire
			});
			navigate(paths.app.ticket.getHref(ticket.id));
			toast.success("Ticket edited successfully");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to edit ticket"
			);
			console.error("Failed to edit ticket:", error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-4"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<Label htmlFor="title">Title</Label>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<Label htmlFor="content">Content</Label>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-x-2 mb-1">
					<div className="w-1/2">
						<FormField
							control={form.control}
							name="deadline"
							render={({ field }) => (
								<FormItem>
									<Label htmlFor="deadline">Deadline </Label>
									<FormControl>
										<DatePicker
											id="deadline"
											name="deadline"
											defaultValue={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="w-1/2">
						<FormField
							control={form.control}
							name="bounty"
							render={({ field }) => (
								<FormItem>
									<Label htmlFor="bounty">Bounty ($)</Label>
									<FormControl>
										<Input
											{...field}
											type="number"
											min="0"
											step="0.01" // Permet les décimales
											onChange={(e) => {
												const value = parseFloat(e.target.value);
												field.onChange(toCent(value)); // Convertit en centimes
											}}
											value={fromCent(field.value)} // Affiche en dollars
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button type="submit" disabled={updateTicketMutation.isPending}>
					{updateTicketMutation.isPending ? "Updating..." : "Update Ticket"}
				</Button>
			</form>
		</Form>
	);
};
