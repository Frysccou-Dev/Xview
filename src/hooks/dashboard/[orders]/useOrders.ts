import { useState, useEffect, useMemo, useCallback } from 'react';
import { ApiService } from '@/services/api.service';
import { IOrder, IProduct } from '@/types';
import { StorageService } from '@/services/storage.service';

export type OrderSortOption =
  | 'date-desc'
  | 'date-asc'
  | 'price-desc'
  | 'price-asc'
  | 'quantity-desc'
  | 'quantity-asc';

const calculateOrderTotal = (
  products: IProduct[],
  quantities: Record<number, number> | undefined
): number => {
  return products.reduce((sum, product) => {
    const quantity = quantities?.[product.id] || 1;
    return sum + product.price * quantity;
  }, 0);
};

const calculateOrderQuantity = (
  products: IProduct[],
  quantities: Record<number, number> | undefined
): number => {
  return products.reduce((sum, product) => {
    const quantity = quantities?.[product.id] || 1;
    return sum + quantity;
  }, 0);
};

const useOrders = () => {
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<OrderSortOption>('date-desc');
  const [priceRange, setPriceRange] = useState<{
    min: number | null;
    max: number | null;
  }>({
    min: null,
    max: null,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 1,
  });
  const [paginatedOrders, setPaginatedOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const userData = StorageService.getUserData();
        if (!userData) {
          setAllOrders([]);
          setError('');
          setIsLoading(false);
          return;
        }
        const userOrders = await ApiService.getUserOrders();
        setAllOrders(userOrders);
        setError('');
      } catch {
        setError('');
        setAllOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...allOrders];

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((order) =>
        order.products.some((product) =>
          product.name.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }

    if (priceRange.min !== null || priceRange.max !== null) {
      filtered = filtered.filter((order) => {
        const orderTotal = calculateOrderTotal(
          order.products,
          order.productQuantities
        );

        const EPSILON = 0.01;

        const minValid =
          priceRange.min === null ||
          Math.abs(orderTotal - priceRange.min) < EPSILON ||
          orderTotal > priceRange.min;

        const maxValid =
          priceRange.max === null ||
          Math.abs(orderTotal - priceRange.max) < EPSILON ||
          orderTotal < priceRange.max;

        return minValid && maxValid;
      });
    }

    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'price-asc':
          return (
            calculateOrderTotal(a.products, a.productQuantities) -
            calculateOrderTotal(b.products, b.productQuantities)
          );
        case 'price-desc':
          return (
            calculateOrderTotal(b.products, b.productQuantities) -
            calculateOrderTotal(a.products, a.productQuantities)
          );
        case 'quantity-asc':
          return (
            calculateOrderQuantity(a.products, a.productQuantities) -
            calculateOrderQuantity(b.products, b.productQuantities)
          );
        case 'quantity-desc':
          return (
            calculateOrderQuantity(b.products, b.productQuantities) -
            calculateOrderQuantity(a.products, a.productQuantities)
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [allOrders, searchQuery, sortOption, priceRange]);

  useEffect(() => {
    const totalPages = Math.ceil(
      filteredAndSortedOrders.length / pagination.itemsPerPage
    );
    setPagination((prev) => ({
      ...prev,
      totalPages: totalPages > 0 ? totalPages : 1,
      currentPage: 1,
    }));
  }, [filteredAndSortedOrders, pagination.itemsPerPage]);

  useEffect(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    setPaginatedOrders(filteredAndSortedOrders.slice(startIndex, endIndex));
  }, [
    filteredAndSortedOrders,
    pagination.currentPage,
    pagination.itemsPerPage,
  ]);

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const updateSortOption = useCallback((option: OrderSortOption) => {
    setSortOption(option);
  }, []);

  const updatePriceRange = useCallback(
    (min: number | null, max: number | null) => {
      setPriceRange({ min, max });
    },
    []
  );

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
    orders: paginatedOrders,
    isLoading,
    error,
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
    totalOrdersCount: filteredAndSortedOrders.length,
  };
};

export default useOrders;
