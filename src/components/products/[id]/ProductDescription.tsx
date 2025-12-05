import React from "react";
import { ProductDescriptionProps } from "@/types";

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
	return (
		<div className="p-4 mb-6 rounded-lg bg-white/5 border border-white/10">
			<p className="text-white/80">{product.description}</p>
		</div>
	);
};

export default ProductDescription;
