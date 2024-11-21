import { AuthLayout } from "@/components/layouts/auth-layout";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { SignInCard } from "@/features/auth/components/sign-in-card";

export const SignInRoute = () => {
	const navigate = useNavigate();

	return (
		// <AuthLayout title="Log in to your account">
		// 	<SignInForm
		// 		onSuccess={() => {
		// 			navigate(paths.home.getHref());
		// 		}}
		// 	/>
		// </AuthLayout>
		<AuthLayout title="Log">
			<SignInCard />
		</AuthLayout>
	);
};
