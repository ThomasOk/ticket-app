import { AppProvider } from "./provider";
import { AppRouter } from "./router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const App = () => {
	return (
		<AppProvider>
			<AppRouter />
			{/* <Input /> */}
			{/* <Button variant="primary" size="lg">
				Click zebizzz
			</Button>
			<Button variant="destructive" size="lg">
				Click zebi
			</Button>
			<p className="text-red-500 font-semibold">Thomas</p> */}
		</AppProvider>
	);
};
