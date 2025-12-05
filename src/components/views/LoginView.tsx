import { Suspense } from "react";
import LoginContent from "@/components/views/content/LoginContent";

export default function LoginView() {
	return (
		<Suspense
			fallback={<div className="p-4 text-center">Cargando login...</div>}
		>
			<LoginContent />
		</Suspense>
	);
}
