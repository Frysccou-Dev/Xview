import { Suspense } from "react";
import RegisterContent from "@/components/views/content/RegisterContent";

export default function RegisterView() {
	return (
		<Suspense
			fallback={<div className="p-4 text-center">Cargando register...</div>}
		>
			<RegisterContent />
		</Suspense>
	);
}
