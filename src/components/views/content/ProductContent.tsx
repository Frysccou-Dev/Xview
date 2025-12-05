"use client";

import React from "react";
import SearchBar from "@/components/products/SearchBar";
import ProductGrid from "@/components/products/ProductGrid";
import LoadingSpinner from "@/components/products/LoadingSpinner";
import ErrorDisplay from "@/components/products/ErrorDisplay";
import CatalogHeader from "@/components/products/CatalogHeader";
import useProductSearch from "@/hooks/products/useProductSearch";
import useCart from "@/hooks/products/useCart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IProduct } from "@/types";

interface ProductContentProps {
	initialProducts: IProduct[];
	initialError: string | null;
}

export default function ProductContent({
	initialProducts,
	initialError,
}: ProductContentProps) {
	const {
		paginatedProducts,
		categories,
		genres,
		loading,
		error,
		pagination,
		updateSearchQuery,
		updateFilters,
		updateSortOption,
		updatePriceRange,
		goToNextPage,
		goToPrevPage,
		goToPage,
	} = useProductSearch({ initialProducts, initialError });
	const { handleQuickAddToCart } = useCart();

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorDisplay message={error} />;

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= pagination.totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => goToPage(i)}
					className={`px-3 py-1 mx-1 rounded-md text-sm transition-colors ${
						pagination.currentPage === i
							? "bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] text-white font-medium"
							: "bg-white/10 text-white/70 hover:bg-white/20"
					}`}
				>
					{i}
				</button>
			);
		}
		return pageNumbers;
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<CatalogHeader />

			<SearchBar
				onSearch={updateSearchQuery}
				onFilter={updateFilters}
				onSort={updateSortOption}
				onPriceRangeChange={updatePriceRange}
				categories={categories}
				genres={genres}
			/>

			<div className="mt-20">
				{paginatedProducts.length > 0 ? (
					<>
						<ProductGrid
							products={paginatedProducts}
							onAddToCart={handleQuickAddToCart}
						/>

						{pagination.totalPages > 1 && (
							<div className="flex justify-center items-center mt-6">
								<button
									onClick={goToPrevPage}
									disabled={pagination.currentPage === 1}
									className={`p-2 rounded-full ${
										pagination.currentPage === 1
											? "text-gray-500 cursor-not-allowed"
											: "text-white hover:bg-white/10"
									}`}
								>
									<ChevronLeft size={20} />
								</button>
								<div className="mx-2 flex items-center">
									{renderPageNumbers()}
								</div>
								<button
									onClick={goToNextPage}
									disabled={
										pagination.currentPage ===
										pagination.totalPages
									}
									className={`p-2 rounded-full ${
										pagination.currentPage ===
										pagination.totalPages
											? "text-gray-500 cursor-not-allowed"
											: "text-white hover:bg-white/10"
									}`}
								>
									<ChevronRight size={20} />
								</button>
							</div>
						)}
					</>
				) : (
					<div className="text-center py-10">
						<p className="text-white text-lg">
							No hay productos disponibles
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
