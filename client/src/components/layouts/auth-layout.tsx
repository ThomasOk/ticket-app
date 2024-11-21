import { useLocation, Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

type LayoutProps = {
	children: React.ReactNode;
	title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
	const location = useLocation();
	const isSignIn = location.pathname === "/sign-in";

	return (
		<main className="bg-neutral-100 min-h-screen">
			<div className="mx-auto max-w-screen-2xl p-4">
				<nav className="flex justify-between items-center">
					{/* <img src={logo} alt="logo" width={152} height={56} /> */}
					<img src={logo} alt="logo" />
					<Button asChild variant="secondary">
						<Link to={isSignIn ? "/sign-up" : "/sign-in"}>
							{isSignIn ? "Sign Up" : "Login"}
						</Link>
					</Button>
				</nav>
				<div className="flex flex-col items-center justify-center pt-4">
					{children}
				</div>
			</div>
		</main>
	);
};
