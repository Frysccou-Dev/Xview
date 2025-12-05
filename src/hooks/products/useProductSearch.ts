import { useState, useEffect, useCallback } from 'react';
import { DataService } from '@/data';
import { IProduct } from '@/types';

export type SortOption =
  | 'relevancy'
  | 'price-low-high'
  | 'price-high-low'
  | 'name-a-z'
  | 'name-z-a'
  | 'stock-low-high'
  | 'stock-high-low';

export interface ProductFilters {
  categories: number[];
  genres: string[];
  searchQuery: string;
  sortOption: SortOption;
  priceRange: {
    min: number | null;
    max: number | null;
  };
}

interface UseProductSearchProps {
  initialProducts?: IProduct[];
  initialError?: string | null;
}

const useProductSearch = ({
  initialProducts,
  initialError,
}: UseProductSearchProps = {}) => {
  const [allProducts, setAllProducts] = useState<IProduct[]>(
    initialProducts || []
  );
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(
    initialProducts || []
  );
  const [paginatedProducts, setPaginatedProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(!initialProducts && !initialError);
  const [error, setError] = useState(initialError || '');
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    genres: [],
    searchQuery: '',
    sortOption: 'relevancy',
    priceRange: {
      min: null,
      max: null,
    },
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
    totalPages: initialProducts ? Math.ceil(initialProducts.length / 6) : 1,
  });

  const parseGenres = (genresData: unknown): string[] => {
    if (!genresData) return [];

    if (Array.isArray(genresData)) {
      return genresData;
    }

    if (typeof genresData === 'string') {
      try {
        const parsed = JSON.parse(genresData);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return genresData.split(',').map((g) => g.trim());
      }
    }

    return [];
  };

  const processInitialData = useCallback((productsData: IProduct[]) => {
    setAllProducts(productsData);
    setFilteredProducts(productsData);
    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(productsData.length / prev.itemsPerPage),
    }));

    const categoryMap = new Map<number, string>();
    const categoryNames: Record<number, string> = {
      1: 'Shonen',
      2: 'Seinen',
      3: 'Shojo',
    };

    productsData.forEach((product) => {
      if (product.categoryId && !categoryMap.has(product.categoryId)) {
        const name =
          categoryNames[product.categoryId] ||
          `Categoría ${product.categoryId}`;
        categoryMap.set(product.categoryId, name);
      }
    });

    const extractedCategories = Array.from(categoryMap).map(([id, name]) => ({
      id: Number(id),
      name,
    }));
    setCategories(extractedCategories);

    const uniqueGenres = new Set<string>();
    productsData.forEach((product) => {
      if (product.genres) {
        const productGenres = parseGenres(product.genres);
        productGenres.forEach((genre) => uniqueGenres.add(genre));
      }
    });
    setGenres(Array.from(uniqueGenres).sort());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      processInitialData(initialProducts);
    } else if (!initialError && !initialProducts) {
      const fetchData = () => {
        try {
          setLoading(true);
          const productsData = DataService.getProducts();
          processInitialData(productsData);
        } catch {
          setError('Error al cargar los datos');
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [initialProducts, initialError, processInitialData]);

  useEffect(() => {
    if (!allProducts.length && !loading) return;

    let result = [...allProducts];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.categoryId)
      );
    }

    if (filters.genres.length > 0) {
      result = result.filter((product) => {
        if (!product.genres) return false;

        const productGenres = parseGenres(product.genres);
        return filters.genres.some((genre) => productGenres.includes(genre));
      });
    }

    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      result = result.filter((product) => {
        const price = product.price;
        const minValid =
          filters.priceRange.min === null || price >= filters.priceRange.min;
        const maxValid =
          filters.priceRange.max === null || price <= filters.priceRange.max;
        return minValid && maxValid;
      });
    }

    if (filters.sortOption !== 'relevancy') {
      result.sort((a, b) => {
        switch (filters.sortOption) {
          case 'price-low-high':
            return a.price - b.price;
          case 'price-high-low':
            return b.price - a.price;
          case 'name-a-z':
            return a.name.localeCompare(b.name);
          case 'name-z-a':
            return b.name.localeCompare(a.name);
          case 'stock-low-high':
            return a.stock - b.stock;
          case 'stock-high-low':
            return b.stock - a.stock;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(result);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      totalPages: Math.ceil(result.length / prev.itemsPerPage),
    }));
  }, [allProducts, filters, loading]);

  useEffect(() => {
    const { currentPage, itemsPerPage } = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, pagination.currentPage, pagination.itemsPerPage]);

  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const updateFilters = useCallback(
    (newFilters: { categories: number[]; genres: string[] }) => {
      setFilters((prev) => ({
        ...prev,
        categories: newFilters.categories,
        genres: newFilters.genres,
      }));
    },
    []
  );

  const updateSortOption = useCallback((option: SortOption) => {
    setFilters((prev) => ({ ...prev, sortOption: option }));
  }, []);

  const updatePriceRange = useCallback(
    (min: number | null, max: number | null) => {
      setFilters((prev) => ({
        ...prev,
        priceRange: { min, max },
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      categories: [],
      genres: [],
      searchQuery: '',
      sortOption: 'relevancy',
      priceRange: { min: null, max: null },
    });
  }, []);

  const goToPage = useCallback((page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  }, []);

  const goToNextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.totalPages),
    }));
  }, []);

  const goToPrevPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1),
    }));
  }, []);

  return {
    products: filteredProducts,
    paginatedProducts,
    allProducts,
    categories,
    genres,
    loading,
    error,
    filters,
    pagination,
    updateSearchQuery,
    updateFilters,
    updateSortOption,
    updatePriceRange,
    resetFilters,
    goToPage,
    goToNextPage,
    goToPrevPage,
  };
};

export default useProductSearch;
