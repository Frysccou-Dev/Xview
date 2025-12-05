import { Suspense } from "react";
import OrdersContent from "@/components/views/content/OrdersContent";

export default function OrdersView() {
	return (
		<Suspense
			fallback={
				<div className="p-4 text-center">Cargando Órdenes...</div>
			}
		>
			<OrdersContent />
		</Suspense>
	);
}
