"use client";

import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "../../../services/api.service";
import Card from "../../ui/Card";
import { IProduct } from "../../../types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GradientText from "@/components/ui/GradientText";

const RelatedProductsSection: React.FC<{ currentProductId: number }> = ({
	currentProductId,
}) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [width, setWidth] = useState(0); // Desactivo el error de width, ya que si se esta utilizando a pesar de marcar que no es asi.
	const [currentIndex, setCurrentIndex] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const allProducts = await ApiService.getProducts();
				const filteredProducts = allProducts.filter(
					(product) => product.id !== currentProductId
				);
				const randomProducts = filteredProducts
					.sort(() => 0.5 - Math.random())
					.slice(0, 5);
				setProducts(randomProducts);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [currentProductId]);

	useEffect(() => {
		if (carousel.current) {
			setWidth(
				carousel.current.scrollWidth - carousel.current.offsetWidth
			);
		}
	}, [products]);

	const scroll = (direction: "left" | "right") => {
		if (carousel.current) {
			const cardWidth = carousel.current.offsetWidth;
			const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

			if (direction === "left" && currentIndex > 0) {
				setCurrentIndex(currentIndex - 1);
			} else if (
				direction === "right" &&
				currentIndex < products.length - 1
			) {
				setCurrentIndex(currentIndex + 1);
			}

			carousel.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="mb-12 relative px-4 sm:px-8 md:px-12 lg:px-16">
			<h2 className="mb-8 text-3xl sm:text-4xl font-bold text-center text-white">
				<GradientText>Relacionados</GradientText>
			</h2>

			{loading ? (
				<div className="flex justify-center">
					<p className="text-white">Cargando productos...</p>
				</div>
			) : (
				<>
					<button
						onClick={() => scroll("left")}
						className="absolute left-0 top-1/2 z-10 text-white hover:text-[var(--pastel-purple)] transition-colors -translate-y-1/2 hidden sm:block"
						aria-label="Scroll left"
						disabled={currentIndex === 0}
					>
						<ChevronLeft
							size={36}
							className={currentIndex === 0 ? "opacity-50" : ""}
						/>
					</button>

					<div className="relative overflow-hidden">
						<motion.div ref={carousel} className="overflow-hidden">
							<motion.div
								className="flex"
								style={{
									scrollSnapType: "x mandatory",
								}}
							>
								{products.map((product) => (
									<motion.div
										key={product.id}
										className="min-h-[180px] p-2 w-full flex-shrink-0 sm:w-auto"
										style={{
											scrollSnapAlign: "center",
											scrollSnapStop: "always",
										}}
									>
										<div className="flex justify-center">
											<Card
												id={product.id.toString()}
												title={product.name}
												imageUrl={
													product.image ||
													"/manga-placeholder.jpg"
												}
												className="sm:w-36 sm:h-48 h-60 w-48 flex-shrink-0"
											/>
										</div>
									</motion.div>
								))}
							</motion.div>
						</motion.div>

						<div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 sm:hidden">
							{products.map((_, index) => (
								<span
									key={index}
									className={`h-2 w-2 mx-1 rounded-full ${
										currentIndex === index
											? "bg-[var(--pastel-purple)]"
											: "bg-gray-400"
									}`}
								/>
							))}
						</div>
					</div>

					<button
						onClick={() => scroll("right")}
						className="absolute right-0 top-1/2 z-10 text-white hover:text-[var(--pastel-salmon)] transition-colors -translate-y-1/2 hidden sm:block"
						aria-label="Scroll right"
						disabled={currentIndex === products.length - 1}
					>
						<ChevronRight
							size={36}
							className={
								currentIndex === products.length - 1
									? "opacity-50"
									: ""
							}
						/>
					</button>

					<div className="flex justify-center mt-4 gap-4 sm:hidden">
						<button
							onClick={() => scroll("left")}
							className="text-white hover:text-[var(--pastel-purple)] transition-colors"
							aria-label="Scroll left"
							disabled={currentIndex === 0}
						>
							<ChevronLeft
								size={28}
								className={
									currentIndex === 0 ? "opacity-50" : ""
								}
							/>
						</button>
						<button
							onClick={() => scroll("right")}
							className="text-white hover:text-[var(--pastel-salmon)] transition-colors"
							aria-label="Scroll right"
							disabled={currentIndex === products.length - 1}
						>
							<ChevronRight
								size={28}
								className={
									currentIndex === products.length - 1
										? "opacity-50"
										: ""
								}
							/>
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default RelatedProductsSection;
