"use client";

import { useContext } from "react";
import { CartContext, CartContextType } from "@/context/CartContext";

const useCart = (): CartContextType => {
	const context = useContext(CartContext);

	if (!context) {
		return {
			cartItems: [],
			cartCount: 0,
			addToCart: () => {},
			removeFromCart: () => {},
			clearCart: () => {},
			isInCart: () => false,
			calculateTotal: () => 0,
			paginatedCartItems: [],
			cartCurrentPage: 1,
			cartTotalPages: 1,
			goToCartPage: () => {},
			goToNextCartPage: () => {},
			goToPrevCartPage: () => {},
		};
	}

	return context;
};

export default useCart;
