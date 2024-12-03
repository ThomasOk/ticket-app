// src/features/ticket/components/ticket-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/config/paths";
import {
	createTicketInputSchema,
	useCreateTicket,
	type CreateTicketInput,
} from "../api/create-ticket";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/spinner";
import { DatePicker } from "@/components/date-picker";
import { format } from "date-fns";
import { fromCent, toCent } from "@/utils/currency";

export const TicketCreateForm = () => {
	const navigate = useNavigate();
	const createTicketMutation = useCreateTicket();

	const form = useForm<CreateTicketInput>({
		resolver: zodResolver(createTicketInputSchema),
		defaultValues: {
			title: "",
			content: "",
			deadline: format(new Date(), "yyyy-MM-dd"),
			bounty: 0,
		},
	});

	const onSubmit = async (data: CreateTicketInput) => {
		try {
			await createTicketMutation.mutateAsync(data);
			toast.success("Ticket created successfully");
			form.reset();
			//navigate(paths.app.tickets.path);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to create ticket"
			);
			console.error("Failed to create ticket:", error);
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

				<Button type="submit" disabled={createTicketMutation.isPending}>
					{createTicketMutation.isPending ? <Spinner /> : "Create Ticket"}
				</Button>
			</form>
		</Form>
	);
};
