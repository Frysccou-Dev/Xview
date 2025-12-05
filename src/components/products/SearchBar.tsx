"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";
import { SortOption } from "@/hooks/products/useProductSearch";

export default function SearchBar({
	onSearch,
	onFilter,
	onSort,
	onPriceRangeChange,
	categories = [],
	genres = [],
}: {
	onSearch: (query: string) => void;
	onFilter: (filters: { categories: number[]; genres: string[] }) => void;
	onSort: (option: SortOption) => void;
	onPriceRangeChange?: (min: number | null, max: number | null) => void;
	categories?: { id: number; name: string }[];
	genres?: string[];
}) {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState<SortOption>("relevancy");
	const [showFilters, setShowFilters] = useState(false);
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");

	const sortDropdownRef = useRef<HTMLDivElement>(null);

	const defaultCategories = [
		{ id: 1, name: "Shonen" },
		{ id: 2, name: "Seinen" },
		{ id: 3, name: "Shojo" },
	];

	const displayCategories =
		categories.length > 0 ? categories : defaultCategories;

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
		if (onSearch) {
			const delayDebounceFn = setTimeout(() => {
				onSearch(searchQuery);
			}, 300);
			return () => clearTimeout(delayDebounceFn);
		}
	}, [searchQuery, onSearch]);

	useEffect(() => {
		if (onFilter) {
			onFilter({
				categories: selectedCategories,
				genres: selectedGenres,
			});
		}
	}, [selectedCategories, selectedGenres, onFilter]);

	useEffect(() => {
		if (onSort) {
			onSort(sortOption);
		}
	}, [sortOption, onSort]);

	const handleCategoryChange = (categoryId: number) => {
		setSelectedCategories((prev) =>
			prev.includes(categoryId)
				? prev.filter((c) => c !== categoryId)
				: [...prev, categoryId]
		);
	};

	const handleGenreChange = (genre: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genre)
				? prev.filter((g) => g !== genre)
				: [...prev, genre]
		);
	};

	useEffect(() => {
		if (onPriceRangeChange) {
			const min = minPrice === "" ? null : Number(minPrice);
			const max = maxPrice === "" ? null : Number(maxPrice);
			onPriceRangeChange(min, max);
		}
	}, [minPrice, maxPrice, onPriceRangeChange]);

	const clearFilters = () => {
		setSelectedCategories([]);
		setSelectedGenres([]);
		setSortOption("relevancy");
		setSearchQuery("");
		setMinPrice("");
		setMaxPrice("");
		onSearch("");
		if (onPriceRangeChange) {
			onPriceRangeChange(null, null);
		}
	};

	const hasActiveFilters =
		selectedCategories.length > 0 ||
		selectedGenres.length > 0 ||
		sortOption !== "relevancy" ||
		searchQuery !== "" ||
		minPrice !== "" ||
		maxPrice !== "";
	const activeFilterCount =
		selectedCategories.length +
		selectedGenres.length +
		(searchQuery ? 1 : 0) +
		(minPrice || maxPrice ? 1 : 0);

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
		<div className="w-full max-w-4xl mx-auto space-y-4">
			<div className="flex flex-wrap gap-2">
				<div className="relative flex-1 min-w-[200px]">
					<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
						<Search className="h-4 w-4" />
					</div>
					<input
						type="text"
						placeholder="Buscar..."
						className="w-full pl-10 pr-4 py-2 text-sm search-input focus:ring-gradient"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="relative" ref={sortDropdownRef}>
					<button
						onClick={() => setShowSortDropdown(!showSortDropdown)}
						className="sort-button flex items-center justify-between px-4 py-2 text-sm font-medium"
					>
						<span>
							{sortOption === "relevancy"
								? "Ordenar"
								: getSortLabel()}
						</span>
						<ChevronDown className="ml-2 h-4 w-4" />
					</button>

					{showSortDropdown && (
						<div className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md dropdown-menu">
							<div className="py-1 px-2 border-b border-white/10">
								<p className="text-sm font-medium text-white">
									Ordenar por
								</p>
							</div>
							<div className="py-1">
								<button
									className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
										sortOption === "relevancy"
											? "dropdown-item-active"
											: "dropdown-item"
									}`}
									onClick={() => {
										setSortOption("relevancy");
										setShowSortDropdown(false);
									}}
								>
									Relevancia
								</button>
								<button
									className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
										sortOption === "price-low-high"
											? "dropdown-item-active"
											: "dropdown-item"
									}`}
									onClick={() => {
										setSortOption("price-low-high");
										setShowSortDropdown(false);
									}}
								>
									Precio: Menor a Mayor
								</button>
								<button
									className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
										sortOption === "price-high-low"
											? "dropdown-item-active"
											: "dropdown-item"
									}`}
									onClick={() => {
										setSortOption("price-high-low");
										setShowSortDropdown(false);
									}}
								>
									Precio: Mayor a Menor
								</button>
								<button
									className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
										sortOption === "name-a-z"
											? "dropdown-item-active"
											: "dropdown-item"
									}`}
									onClick={() => {
										setSortOption("name-a-z");
										setShowSortDropdown(false);
									}}
								>
									Nombre: A - Z
								</button>
								<button
									className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
										sortOption === "name-z-a"
											? "dropdown-item-active"
											: "dropdown-item"
									}`}
									onClick={() => {
										setSortOption("name-z-a");
										setShowSortDropdown(false);
									}}
								>
									Nombre: Z - A
								</button>
								<button
									className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
										sortOption === "stock-low-high"
											? "dropdown-item-active"
											: "dropdown-item"
									}`}
									onClick={() => {
										setSortOption("stock-low-high");
										setShowSortDropdown(false);
									}}
								>
									Stock: Menor a Mayor
								</button>
								<button
									className={`flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ${
										sortOption === "stock-high-low"
											? "dropdown-item-active"
											: "dropdown-item"
									}`}
									onClick={() => {
										setSortOption("stock-high-low");
										setShowSortDropdown(false);
									}}
								>
									Stock: Mayor a Menor
								</button>
							</div>
						</div>
					)}
				</div>

				<button
					onClick={() => setShowFilters(!showFilters)}
					className="filter-button flex items-center px-4 py-2 text-sm font-medium"
				>
					<SlidersHorizontal className="h-4 w-4 mr-2" />
					<span>Filtros</span>
					{activeFilterCount > 0 && (
						<span className="ml-2 inline-flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full text-xs font-medium filter-badge">
							{activeFilterCount}
						</span>
					)}
				</button>
			</div>

			{showFilters && (
				<div className="filter-panel p-4 rounded-lg">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="font-medium text-white border-b border-white/10 pb-2">
								Categorías
							</div>
							<div className="grid grid-cols-2 gap-2">
								{displayCategories.map((category) => (
									<div
										key={category.id}
										className="flex items-center space-x-2"
									>
										<div className="relative">
											<input
												type="checkbox"
												id={`category-${category.id}`}
												checked={selectedCategories.includes(
													category.id
												)}
												onChange={() =>
													handleCategoryChange(
														category.id
													)
												}
												className="custom-checkbox sr-only"
											/>
											<label
												htmlFor={`category-${category.id}`}
												className="flex items-center"
											>
												<span className="custom-checkbox-box flex items-center justify-center">
													{selectedCategories.includes(
														category.id
													) && (
														<Check className="h-3 w-3 text-black" />
													)}
												</span>
												<span className="ml-2 text-sm text-white">
													{category.name}
												</span>
											</label>
										</div>
									</div>
								))}
							</div>

							<div className="font-medium text-white border-b border-white/10 pb-2 mt-6">
								Rango de Precio
							</div>
							<div className="flex flex-col space-y-2">
								<div className="flex items-center space-x-2">
									<input
										type="text"
										placeholder="Mínimo"
										className="w-full pl-3 pr-3 py-2 text-sm search-input focus:ring-gradient"
										value={minPrice}
										onChange={handleMinPriceChange}
									/>
									<span className="text-white">a</span>
									<input
										type="text"
										placeholder="Máximo"
										className="w-full pl-3 pr-3 py-2 text-sm search-input focus:ring-gradient"
										value={maxPrice}
										onChange={handleMaxPriceChange}
									/>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="font-medium text-white border-b border-white/10 pb-2">
								Géneros
							</div>
							<div className="grid grid-cols-2 gap-2">
								{genres.map((genre) => (
									<div
										key={genre}
										className="flex items-center space-x-2"
									>
										<div className="relative">
											<input
												type="checkbox"
												id={`genre-${genre}`}
												checked={selectedGenres.includes(
													genre
												)}
												onChange={() =>
													handleGenreChange(genre)
												}
												className="custom-checkbox sr-only"
											/>
											<label
												htmlFor={`genre-${genre}`}
												className="flex items-center"
											>
												<span className="custom-checkbox-box flex items-center justify-center">
													{selectedGenres.includes(
														genre
													) && (
														<Check className="h-3 w-3 text-black" />
													)}
												</span>
												<span className="ml-2 text-sm text-white">
													{genre}
												</span>
											</label>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{hasActiveFilters && (
						<div className="mt-4">
							<button
								onClick={clearFilters}
								className="clear-filters-button w-full flex items-center justify-center px-4 py-2 text-sm font-medium"
							>
								<X className="h-4 w-4 mr-2" />
								Limpiar todos los filtros
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);

	function getSortLabel() {
		switch (sortOption) {
			case "relevancy":
				return "Relevancia";
			case "price-low-high":
				return "Precio: Menor a Mayor";
			case "price-high-low":
				return "Precio: Mayor a Menor";
			case "name-a-z":
				return "Nombre: A - Z";
			case "name-z-a":
				return "Nombre: Z - A";
			case "stock-low-high":
				return "Stock: Menor a Mayor";
			case "stock-high-low":
				return "Stock: Mayor a Menor";
			default:
				return "Ordenar por";
		}
	}
}
