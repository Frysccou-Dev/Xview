"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import useUserData from "@/hooks/dashboard/useUserData";
import useOrders from "@/hooks/dashboard/[orders]/useOrders";
import useTabNavigation from "@/hooks/dashboard/useTabNavigation";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import OrdersList from "@/components/dashboard/[orders]/OrdersList";
import OrdersFilter from "@/components/dashboard/[orders]/OrdersFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OrdersContent() {
	const { activeTab, setActiveTab } = useTabNavigation("orders");
	const { user, loading: userLoading } = useUserData();
	const {
		orders,
		isLoading: ordersLoading,
		searchQuery,
		sortOption,
		priceRange,
		pagination,
		updateSearchQuery,
		updateSortOption,
		updatePriceRange,
		goToPage,
		goToNextPage,
		goToPrevPage,
		error,
		totalOrdersCount,
	} = useOrders();
	const router = useRouter();

	useEffect(() => {
		if (!userLoading && !user) {
			router.push("/login");
		}
	}, [userLoading, user, router]);

	if (userLoading || ordersLoading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return null;
	}

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
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<h1 className="mb-6 text-3xl font-bold text-center text-white">
				<span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Mi Perfil
				</span>
			</h1>

			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

			<div className="w-full max-w-4xl">
				<OrdersFilter
					searchQuery={searchQuery}
					sortOption={sortOption}
					priceRange={priceRange}
					onSearchChange={updateSearchQuery}
					onSortChange={updateSortOption}
					onPriceRangeChange={updatePriceRange}
				/>
				{error && (
					<div className="p-4 mb-4 text-center text-red-300 bg-red-500/20 rounded-md border border-red-500/30">
						{error}
					</div>
				)}
				{totalOrdersCount > 0 ? (
					<>
						<OrdersList orders={orders} />
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
					!ordersLoading && (
						<div className="p-4 md:p-6 glass-effect">
							<div className="p-4 text-center text-white/70 rounded-md border bg-white/5 border-white/10">
								No se encontraron órdenes. Lo sentimos.
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
