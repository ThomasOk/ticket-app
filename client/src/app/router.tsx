import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";

const router = createBrowserRouter([
	{
		path: paths.home.path,
		lazy: async () => {
			const { LandingRoute } = await import("./routes/landing");
			return { Component: LandingRoute };
		},
	},
	{
		path: paths.auth.login.path,
		lazy: async () => {
			const { SignInRoute } = await import("./routes/auth/sign-in");
			return { Component: SignInRoute };
		},
	},
	{
		path: paths.auth.register.path,
		lazy: async () => {
			const { SignUpRoute } = await import("./routes/auth/sign-up");
			return { Component: SignUpRoute };
		},
	},
	{
		path: paths.app.tickets.path,
		lazy: async () => {
			const { TicketsRoute } = await import("./routes/app/tickets/tickets");
			return { Component: TicketsRoute };
		},
	},
	{
		path: paths.app.ticket.path,
		// loader: async ({ params }) => {
		// 	return params;
		// },
		lazy: async () => {
			const { TicketRoute } = await import("./routes/app/tickets/ticket");
			return { Component: TicketRoute };
		},
	},
]);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
