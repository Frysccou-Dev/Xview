import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const useUserData = () => {
	const router = useRouter();
	const { user, isLoading, logout: authLogout } = useAuth();

	const handleLogout = () => {
		authLogout();
		router.push("/login");
	};

	return {
		user,
		loading: isLoading,
		handleLogout,
	};
};

export default useUserData;
