"use client";

import React, { useState } from "react";
import { OrdersListProps, IProduct } from "@/types";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GradientText from "@/components/ui/GradientText";
import RepeatOrder from "./RepeatOrder";

const PRODUCTS_PER_PAGE = 3;

const OrdersList = ({ orders }: OrdersListProps) => {
	const [productPages, setProductPages] = useState<Record<number, number>>(
		{}
	);

	if (orders.length === 0) {
		return null;
	}

	const formatDate = (dateString: Date) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("es-ES", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusBadgeClass = (status: string) => {
		switch (status.toLowerCase()) {
			case "approved":
				return "bg-green-500/20 text-green-300 border-green-500/30";
			case "pending":
				return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
			case "rejected":
				return "bg-red-500/20 text-red-300 border-red-500/30";
			default:
				return "bg-gray-500/20 text-gray-300 border-gray-500/30";
		}
	};

	const getStatusText = (status: string) => {
		switch (status.toLowerCase()) {
			case "approved":
				return "Aprobada";
			case "pending":
				return "Pendiente";
			case "rejected":
				return "Rechazada";
			default:
				return status;
		}
	};

	const handleProductPageChange = (
		orderId: number,
		direction: "prev" | "next"
	) => {
		setProductPages((prevPages) => {
			const currentPage = prevPages[orderId] || 1;
			const order = orders.find((o) => o.id === orderId);
			if (!order) return prevPages;

			const totalPages = Math.ceil(
				order.products.length / PRODUCTS_PER_PAGE
			);
			let nextPage = currentPage;

			if (direction === "prev" && currentPage > 1) {
				nextPage = currentPage - 1;
			} else if (direction === "next" && currentPage < totalPages) {
				nextPage = currentPage + 1;
			}

			return {
				...prevPages,
				[orderId]: nextPage,
			};
		});
	};

	const getPaginatedProducts = (orderId: number, products: IProduct[]) => {
		const currentPage = productPages[orderId] || 1;
		const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
		const endIndex = startIndex + PRODUCTS_PER_PAGE;
		return products.slice(startIndex, endIndex);
	};

	return (
		<div className="space-y-4 md:space-y-6">
			{orders.map((order) => {
				const currentPage = productPages[order.id] || 1;
				const totalProductPages = Math.ceil(
					order.products.length / PRODUCTS_PER_PAGE
				);
				const paginatedProducts = getPaginatedProducts(
					order.id,
					order.products
				);

				return (
					<div
						key={order.id}
						className="p-4 md:p-6 glass-effect rounded-lg"
					>
						<div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center mb-3 md:mb-4">
							<h3 className="text-lg md:text-xl font-semibold text-white">
								Orden #{order.id}
							</h3>
							<span
								className={`px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded-full border self-start md:self-auto ${getStatusBadgeClass(
									order.status
								)}`}
							>
								{getStatusText(order.status)}
							</span>
						</div>

						<div className="mb-3 md:mb-4 text-sm text-white/70">
							<p>Fecha: {formatDate(order.date)}</p>
						</div>

						<div className="mt-4">
							<h4 className="mb-2 text-base md:text-lg font-medium text-white">
								Productos:
							</h4>
							<div className="space-y-2 md:space-y-3">
								{paginatedProducts.map((product) => {
									const quantity =
										order.productQuantities?.[product.id] ||
										1;
									return (
										<div
											key={product.id}
											className="flex justify-between items-center p-2 md:p-3 rounded-md bg-white/5 border border-white/10"
										>
											<div className="flex items-center min-w-0 mr-2">
												{product.image && (
													<Image
														src={product.image}
														alt={product.name}
														width={40}
														height={40}
														className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-md mr-2 md:mr-3 flex-shrink-0"
													/>
												)}
												<div className="min-w-0">
													<p className="text-sm md:text-base text-white truncate">
														{product.name}
													</p>
													<p className="text-xs md:text-sm text-white/70">
														Cantidad: {quantity}
													</p>
												</div>
											</div>
											<p className="text-sm md:text-base text-white font-medium flex-shrink-0">
												$
												{(
													product.price * quantity
												).toFixed(2)}
											</p>
										</div>
									);
								})}
							</div>

							{totalProductPages > 1 && (
								<div className="mt-3 flex justify-center items-center space-x-3">
									<button
										onClick={() =>
											handleProductPageChange(
												order.id,
												"prev"
											)
										}
										disabled={currentPage === 1}
										className="p-1 rounded-full text-white disabled:text-white/30 hover:bg-white/10 disabled:hover:bg-transparent transition-colors"
										aria-label="Página anterior de productos"
									>
										<ChevronLeft size={20} />
									</button>
									<GradientText className="text-sm">
										{currentPage} / {totalProductPages}
									</GradientText>
									<button
										onClick={() =>
											handleProductPageChange(
												order.id,
												"next"
											)
										}
										disabled={
											currentPage === totalProductPages
										}
										className="p-1 rounded-full text-white disabled:text-white/30 hover:bg-white/10 disabled:hover:bg-transparent transition-colors"
										aria-label="Página siguiente de productos"
									>
										<ChevronRight size={20} />
									</button>
								</div>
							)}
						</div>

						<div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/10 flex justify-between items-center">
							<div>
								<RepeatOrder order={order} />
							</div>
							<div>
								<p className="text-base md:text-xl font-bold text-white">
									Total: $
									{order.products
										.reduce((sum, product) => {
											const quantity =
												order.productQuantities?.[
													product.id
												] || 1;
											return (
												sum + product.price * quantity
											);
										}, 0)
										.toFixed(2)}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default OrdersList;
