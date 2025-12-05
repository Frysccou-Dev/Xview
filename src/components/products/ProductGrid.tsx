import { FC } from "react";
import { IProduct, ProductGridProps } from "@/types";
import ProductCard from "./ProductCard";


const ProductGrid: FC<ProductGridProps> = ({ products, onAddToCart }) => {
	if (products.length === 0) {
		return (
			<div className="text-center py-10">
				<p className="text-white text-lg">
					No se encontraron productos
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					onAddToCart={onAddToCart}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
