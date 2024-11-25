import { MainErrorFallback } from "@/components/errors/main";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type AppProviderProps = {
	children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<ErrorBoundary FallbackComponent={MainErrorFallback}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				{children}
			</ThemeProvider>
		</ErrorBoundary>
	);
};
