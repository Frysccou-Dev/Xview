"use client";

import React from "react";
import { StorageService } from "@/services/storage.service";
import { IProduct } from "@/types";
import ActionButtons from "./ActionButtons";

const ProductInteractiveSection: React.FC<{ product: IProduct }> = ({
	product,
}) => {
	const handleAddToCart = () => {
		StorageService.addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: 1,
		});
	};

	return (
		<>
			<ActionButtons onAddToCart={handleAddToCart} product={product} />
		</>
	);
};

export default ProductInteractiveSection;
