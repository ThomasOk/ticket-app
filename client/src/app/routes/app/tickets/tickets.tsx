import { ContentLayout } from "@/components/layouts/content-layout";
import { Heading } from "@/components/heading";
import { Suspense } from "react";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Spinner } from "@/components/spinner";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/main";

export const TicketsRoute = () => {
	return (
		<ContentLayout>
			<div className="flex-1 flex flex-col gap-y-8">
				<Heading title="Tickets" description="All your tickets at one place" />

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
