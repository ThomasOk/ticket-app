import { ContentLayout } from "@/components/layouts/content-layout";
import { Heading } from "@/components/heading";
import { Suspense } from "react";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Spinner } from "@/components/spinner";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/main";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";
import { CardCompact } from "@/components/card-compact";

export const TicketsRoute = () => {
	return (
		<ContentLayout>
			<div className="flex-1 flex flex-col gap-y-8">
				<Heading title="Tickets" description="All your tickets at one place" />

				<CardCompact
					title="Create Ticket"
					description="A new ticket will be created"
					className="w-full max-w[420px] self-centered"
					content={<TicketCreateForm />}
				/>

				{/* On pourra utiliser Suspense avec React Query
				<Suspense fallback={<Spinner />}>
					<TicketList />
				</Suspense> */}
				<ErrorBoundary FallbackComponent={MainErrorFallback}>
					<TicketList />
				</ErrorBoundary>
			</div>
		</ContentLayout>
	);
};
