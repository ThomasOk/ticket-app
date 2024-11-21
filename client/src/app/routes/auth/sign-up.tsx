import { AuthLayout } from "@/components/layouts/auth-layout";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

export const SignUpRoute = () => {
	const navigate = useNavigate();

	return (
		<AuthLayout title="Log">
			<SignUpCard />
		</AuthLayout>
	);
};
