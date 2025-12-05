import { useState, useEffect } from 'react';
import { DataService } from '@/data';
import { IProduct } from '@/types';

const useProductDetails = (productId: number) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = () => {
      try {
        const foundProduct = DataService.getProductById(productId);

        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  return { product, loading, error };
};

export default useProductDetails;
