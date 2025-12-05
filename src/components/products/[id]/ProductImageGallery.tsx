import React from "react";
import Image from "next/image";
import { ProductImageGalleryProps } from "@/types";

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
	product,
}) => {
	return (
		<div className="relative mb-8 w-full h-[400px] md:w-1/2 md:h-[600px] md:mb-0">
			<Image
				src={product.image}
				alt={product.name}
				fill
				sizes="(max-width: 768px) 100vw, 50vw"
				style={{ objectFit: "cover" }}
				className="rounded-lg"
				priority
			/>
		</div>
	);
};

export default ProductImageGallery;
