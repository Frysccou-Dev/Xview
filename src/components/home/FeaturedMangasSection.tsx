import React, { useEffect, useState, useRef } from "react";
import Card from "@/components/ui/Card";
import { FeaturedMangasSectionProps } from "@/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SkeletonCardContainer from "../ui/SkeletonCardContainer";
import { GradientText } from "../ui";

const FeaturedMangasSection = ({
	mangas,
	loading,
}: FeaturedMangasSectionProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [width, setWidth] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (carousel.current) {
			setWidth(
				carousel.current.scrollWidth - carousel.current.offsetWidth
			);
		}
	}, [mangas]);

	const scroll = (direction: "left" | "right") => {
		if (carousel.current) {
			const cardWidth = carousel.current.offsetWidth;
			const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

			if (direction === "left" && currentIndex > 0) {
				setCurrentIndex(currentIndex - 1);
			} else if (
				direction === "right" &&
				currentIndex < mangas.length - 1
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
		<section className="mb-12 relative px-4 sm:px-8 md:px-12 lg:px-16 w-full max-w-6xl mx-auto">
			<h2 className="mb-8 text-4xl font-bold text-center text-white md:text-5xl">
				<GradientText>Mangas Destacados</GradientText>
			</h2>

			{loading ? (
				<div className="flex justify-center">
					<SkeletonCardContainer />
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
								{mangas.map((manga) => (
									<motion.div
										key={manga.id}
										className="min-h-[180px] p-2 w-full flex-shrink-0 sm:w-auto"
										style={{
											scrollSnapAlign: "center",
											scrollSnapStop: "always",
										}}
									>
										<div className="flex justify-center">
											<Card
												id={manga.id.toString()}
												imageUrl={
													manga.image ||
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
							{mangas.map((_, index) => (
								<span
									key={index}
									className={`h-2 w-2 mx-1 rounded-full ${
										currentIndex === index
											? "bg-[var(--pastel-purple)]"
											: "bg-gray-400"
									}`}
									onClick={() => {
										setCurrentIndex(index);
										if (carousel.current) {
											const cardWidth =
												carousel.current.offsetWidth;
											carousel.current.scrollTo({
												left: index * cardWidth,
												behavior: "smooth",
											});
										}
									}}
								/>
							))}
						</div>
					</div>

					<button
						onClick={() => scroll("right")}
						className="absolute right-0 top-1/2 z-10 text-white hover:text-[var(--pastel-salmon)] transition-colors -translate-y-1/2 hidden sm:block"
						aria-label="Scroll right"
						disabled={currentIndex === mangas.length - 1}
					>
						<ChevronRight
							size={36}
							className={
								currentIndex === mangas.length - 1
									? "opacity-50"
									: ""
							}
						/>
					</button>

					<div className="flex justify-center mt-4 gap-4 sm:hidden">
						<button
							onClick={() => scroll("left")}
							className="text-white hover:text-[var(--pastel-purple)] transition-colors p-2"
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
							className="text-white hover:text-[var(--pastel-salmon)] transition-colors p-2"
							aria-label="Scroll right"
							disabled={currentIndex === mangas.length - 1}
						>
							<ChevronRight
								size={28}
								className={
									currentIndex === mangas.length - 1
										? "opacity-50"
										: ""
								}
							/>
						</button>
					</div>
				</>
			)}
		</section>
	);
};

export default FeaturedMangasSection;
