import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";

const router = createBrowserRouter([
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
]);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
