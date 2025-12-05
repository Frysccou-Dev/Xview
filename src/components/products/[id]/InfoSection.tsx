import { GradientText } from "@/components/ui";
import React from "react";

const InfoSection = () => {
	return (
		<p className="text-sm text-gray-400 mt-4 mb-4">
			<GradientText className="pr-px">Nota:</GradientText>Debido a restricciones de
			exportación, solo se permite la compra de una unidad por pedido.
		</p>
	);
};

export default InfoSection;
