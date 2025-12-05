import React from "react";
import { ProductPricingProps } from "@/types";

const ProductPricing: React.FC<ProductPricingProps> = ({ product }) => {
	return (
		<>
			<div className="flex items-center mb-4">
				<span className="text-white">Stock:</span>
				<span
					className={`ml-2 font-medium ${
						product.stock > 5
							? "text-green-400"
							: "text-[var(--pastel-salmon)]"
					}`}
				>
					{product.stock} unidades
				</span>
			</div>

			<p className="mb-6 text-2xl font-bold text-[var(--pastel-purple)]">
				${product.price}
			</p>
		</>
	);
};

export default ProductPricing;
