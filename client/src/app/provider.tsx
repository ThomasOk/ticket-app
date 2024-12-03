import { MainErrorFallback } from "@/components/errors/main";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { useState, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryConfig } from "@/lib/react-query";
import { Toaster } from "@/components/toast";

type AppProviderProps = {
	children: ReactNode;
};

//const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps) => {
	const [queryClient] = useState(
		() => new QueryClient({ defaultOptions: queryConfig })
	);

	return (
		<ErrorBoundary FallbackComponent={MainErrorFallback}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<QueryClientProvider client={queryClient}>
					{import.meta.env.DEV && <ReactQueryDevtools />}
					<Toaster />
					{children}
				</QueryClientProvider>
			</ThemeProvider>
		</ErrorBoundary>
	);
};
