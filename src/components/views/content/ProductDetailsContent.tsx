"use client";

import React, { useEffect, useState } from "react";
import { ApiService } from "@/services/api.service";
import ProductImageGallery from "@/components/products/[id]/ProductImageGallery";
import ProductHeader from "@/components/products/[id]/ProductHeader";
import ProductPricing from "@/components/products/[id]/ProductPricing";
import ProductDescription from "@/components/products/[id]/ProductDescription";
import ProductInteractiveSection from "@/components/products/[id]/ProductInteractiveSection";
import RelatedProductsSection from "@/components/products/[id]/RelatedProductsSection";
import InfoSection from "@/components/products/[id]/InfoSection";
import LoadingSpinner from "@/components/products/LoadingSpinner";
import { IProduct } from "@/types";

export default function ProductDetailsContent({
	productId,
}: {
	productId: string;
}) {
	const [product, setProduct] = useState<IProduct | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const id = Number(productId);
				const allProducts = await ApiService.getProducts();
				const foundProduct =
					allProducts.find((p) => p.id === id) || null;
				setProduct(foundProduct);
				if (!foundProduct) {
					setError("Producto no encontrado");
				}
			} catch {
				setError("Error al cargar el producto");
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	if (loading) return <LoadingSpinner />;

	if (!product) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-white text-xl">
					{error || "Producto no encontrado"}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<div className="w-full max-w-6xl">
				<div className="flex flex-col mb-12 md:flex-row md:gap-8">
					<ProductImageGallery product={product} />
					<div className="flex flex-col md:w-1/2">
						<ProductHeader product={product} />
						<ProductPricing product={product} />
						<ProductDescription product={product} />
						<InfoSection />
						<ProductInteractiveSection product={product} />
					</div>
				</div>
				<RelatedProductsSection currentProductId={product.id} />
			</div>
		</div>
	);
}
