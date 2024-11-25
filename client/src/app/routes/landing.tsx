import { Link, useNavigate } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { paths } from "@/config/paths";
import { ContentLayout } from "@/components/layouts/content-layout";
import { Heading } from "@/components/heading";

export const LandingRoute = () => {
	const navigate = useNavigate();

	return (
		<ContentLayout>
			<div className="flex-1 flex flex-col gap-y-8">
				<Heading title="Home" description="Your home place to start" />
				<div className="flex-1 flex flex-col items-center">
					<Link to={paths.app.tickets.path} className="text-sm underline">
						Go to Tickets
					</Link>
				</div>
			</div>
		</ContentLayout>
	);
};
