import { paths } from "@/config/paths";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { LucideKanban } from "lucide-react";
import { ThemeSwitcher } from "./theme/theme-switcher";

export const Header = () => {
	return (
		<nav
			className="
          
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
		>
			<div className="flex align-items gap-x-2">
				<Link
					to={paths.home.path}
					className={buttonVariants({ variant: "ghost" })}
				>
					<LucideKanban />
					<h1 className="text-lg font-semibold">TicketBounty</h1>
				</Link>
			</div>
			<div className="flex align-items gap-x-2">
				<ThemeSwitcher />
				<Link
					to={paths.app.tickets.path}
					className={buttonVariants({ variant: "default" })}
				>
					Tickets
				</Link>
			</div>
		</nav>
	);
};
