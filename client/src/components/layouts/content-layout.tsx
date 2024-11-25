import * as React from "react";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { buttonVariants } from "../ui/button";
import { LucideKanban } from "lucide-react";
import { Header } from "../header";

type ContentLayoutProps = {
	children: React.ReactNode;
	// title: string;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
	return (
		<>
			<Header />
			<main
				className="
            min-h-screen flex-1
            overflow-y-auto overflow-x-hidden
            py-24 px-8
           
            flex flex-col
          "
			>
				{children}
			</main>
		</>
	);
};
