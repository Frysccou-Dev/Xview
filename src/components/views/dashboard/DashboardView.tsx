import { Suspense } from "react";
import DashboardContent from "@/components/views/content/DashboardContent";

export default function DashboardView() {
	return (
		<Suspense
			fallback={
				<div className="p-4 text-center">Cargando dashboard...</div>
			}
		>
			<DashboardContent />
		</Suspense>
	);
}
