import { FC } from "react";
import GradientText from "@/components/ui/GradientText";

const CatalogHeader: FC = () => {
	return (
		<h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
			<GradientText>Catálogo de Mangas</GradientText>
		</h1>
	);
};

export default CatalogHeader;
