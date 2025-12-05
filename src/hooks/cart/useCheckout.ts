import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiService } from '@/services/api.service';
import { showToast } from '@/components/ui/Toast';
import usePaymentForm from './usePaymentForm';
import useCart from '@/hooks/useCart';
import useAuth from '@/hooks/useAuth';

const useCheckout = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();
  const { paymentInfo, formErrors, handleInputChange, validateForm } =
    usePaymentForm();
  const { cartItems, clearCart } = useCart();
  const { user, updateUser, isAuthenticated } = useAuth();

  const proceedToCheckout = () => {
    if (!isAuthenticated) {
      showToast({
        message: 'Inicia sesión para completar la compra',
        type: 'warning',
      });
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }
    setShowCheckout(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error)) {
      showToast({
        message: 'Por favor, completa todos los campos requeridos',
        type: 'error',
      });
      return;
    }

    if (!isAuthenticated) {
      showToast({
        message: 'Debes iniciar sesión para completar la compra',
        type: 'error',
      });
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }

    const productsWithQuantity = cartItems.map((item) => ({
      id: Number(item.id),
      quantity: 1,
    }));

    try {
      await ApiService.createOrder({
        products: productsWithQuantity,
      });

      const updatedOrders = await ApiService.getUserOrders();
      if (user) {
        updateUser({ orders: updatedOrders });
      }

      clearCart();
      setShowCheckout(false);
      showToast({
        message: '¡Compra realizada con éxito!',
        type: 'success',
      });
      setTimeout(() => {
        router.push('/products');
      }, 1500);
    } catch {
      showToast({
        message: 'Error al procesar tu compra. Inténtalo de nuevo.',
        type: 'error',
      });
    }
  };

  return {
    showCheckout,
    paymentInfo,
    formErrors,
    handleInputChange,
    proceedToCheckout,
    handlePaymentSubmit,
  };
};

export default useCheckout;
