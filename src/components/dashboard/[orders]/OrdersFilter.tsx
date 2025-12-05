"use client";

import React, { useState, useRef, useEffect } from "react";
import { OrderSortOption, OrdersFilterProps } from "@/types";
import { Search, ChevronDown } from "lucide-react";

const sortOptions: { value: OrderSortOption; label: string }[] = [
	{ value: "date-desc", label: "Fecha: Más recientes" },
	{ value: "date-asc", label: "Fecha: Más antiguos" },
	{ value: "price-desc", label: "Precio: Mayor a Menor" },
	{ value: "price-asc", label: "Precio: Menor a Mayor" },
	{ value: "quantity-desc", label: "Cantidad: Mayor a Menor" },
	{ value: "quantity-asc", label: "Cantidad: Menor a Mayor" },
];

const OrdersFilter = ({
	searchQuery,
	sortOption,
	priceRange = { min: null, max: null },
	onSearchChange,
	onSortChange,
	onPriceRangeChange,
}: OrdersFilterProps) => {
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [minPrice, setMinPrice] = useState<string>(
		priceRange.min !== null ? priceRange.min.toString() : ""
	);
	const [maxPrice, setMaxPrice] = useState<string>(
		priceRange.max !== null ? priceRange.max.toString() : ""
	);
	const sortDropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				sortDropdownRef.current &&
				!sortDropdownRef.current.contains(event.target as Node)
			) {
				setShowSortDropdown(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (onPriceRangeChange) {
			const min = minPrice === "" ? null : Number(minPrice);
			const max = maxPrice === "" ? null : Number(maxPrice);
			onPriceRangeChange(min, max);
		}
	}, [minPrice, maxPrice, onPriceRangeChange]);

	const getSortLabel = (option: OrderSortOption) => {
		return (
			sortOptions.find((o) => o.value === option)?.label || "Ordenar por"
		);
	};

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
			setMinPrice(value);
		}
	};

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
			setMaxPrice(value);
		}
	};

	return (
		<div className="flex flex-col gap-4 mb-4">
			<div className="flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="relative w-full md:w-1/2 lg:w-1/3">
					<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
						<Search className="h-4 w-4" />
					</div>
					<input
						type="text"
						placeholder="Buscar en órdenes por producto..."
						className="w-full pl-10 pr-4 py-2 text-sm search-input focus:ring-gradient"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
					/>
				</div>

				<div
					className="relative w-full md:w-auto"
					ref={sortDropdownRef}
				>
					<button
						onClick={() => setShowSortDropdown(!showSortDropdown)}
						className="sort-button flex items-center justify-between w-full md:w-auto px-4 py-2 text-sm font-medium"
					>
						<span>{getSortLabel(sortOption)}</span>
						<ChevronDown className="ml-2 h-4 w-4" />
					</button>

					{showSortDropdown && (
						<div className="absolute right-0 z-10 mt-1 w-full md:w-56 origin-top-right rounded-md dropdown-menu">
							<div className="py-1 px-2 border-b border-white/10">
								<p className="text-sm font-medium text-white">
									Ordenar por
								</p>
							</div>
							<div className="py-1">
								{sortOptions.map((option) => (
									<button
										key={option.value}
										className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
											sortOption === option.value
												? "dropdown-item-active"
												: "dropdown-item"
										}`}
										onClick={() => {
											onSortChange(option.value);
											setShowSortDropdown(false);
										}}
									>
										{option.label}
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col md:flex-row items-center gap-4">
				<div className="w-full md:w-auto font-medium text-white text-sm">
					Filtrar por rango de precio:
				</div>
				<div className="flex items-center space-x-2 w-full md:w-auto">
					<input
						type="text"
						placeholder="Mínimo"
						className="w-full md:w-32 pl-3 pr-3 py-2 text-sm search-input focus:ring-gradient"
						value={minPrice}
						onChange={handleMinPriceChange}
					/>
					<span className="text-white">a</span>
					<input
						type="text"
						placeholder="Máximo"
						className="w-full md:w-32 pl-3 pr-3 py-2 text-sm search-input focus:ring-gradient"
						value={maxPrice}
						onChange={handleMaxPriceChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default OrdersFilter;
