import React, { Suspense } from "react";
import HomeContent from "@/components/views/content/HomeContent";

const HomeView: React.FC = () => {
	return (
		<Suspense fallback={<div>Cargando Home...</div>}>
			<HomeContent />
		</Suspense>
	);
};

export default HomeView;
