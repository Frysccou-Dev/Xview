import { Suspense } from "react";
import ContactContent from "@/components/views/content/ContactContent";

export default function ContactView() {
	return (
		<Suspense
			fallback={
				<div className="p-4 text-center">Cargando contacto...</div>
			}
		>
			<ContactContent />
		</Suspense>
	);
}
