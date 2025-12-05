"use client";

import React from "react";
import CartItemList from "@/components/cart/CartItemList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import CheckoutForm from "@/components/cart/CheckoutForm";
import useCart from "@/hooks/useCart";
import useCheckout from "@/hooks/cart/useCheckout";
import { CartViewProps } from "@/types";
import GradientText from "@/components/ui/GradientText";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CartContent: React.FC<CartViewProps> = ({ showTitle = false }) => {
	const {
		cartItems,
		removeFromCart,
		clearCart,
		calculateTotal,
		paginatedCartItems,
		cartCurrentPage,
		cartTotalPages,
		goToCartPage,
		goToNextCartPage,
		goToPrevCartPage,
	} = useCart();

	const {
		showCheckout,
		paymentInfo,
		formErrors,
		handleInputChange,
		proceedToCheckout,
		handlePaymentSubmit,
	} = useCheckout();

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= cartTotalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => goToCartPage(i)}
					className={`px-3 py-1 mx-1 rounded-md text-sm transition-colors ${
						cartCurrentPage === i
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
		<>
			{showTitle && (
				<h1 className="mb-6 text-3xl font-bold text-center text-white">
					<GradientText className="text-5xl">
						{cartItems.length > 0
							? "Tu Carrito"
							: "Tu carrito está vacío"}
					</GradientText>
				</h1>
			)}

			{cartItems.length > 0 ? (
				<div className="w-full max-w-3xl">
					<div className="p-6 mb-4 glass-effect">
						<CartItemList
							items={paginatedCartItems}
							onRemoveItem={removeFromCart}
						/>
						{cartTotalPages > 1 && (
							<div className="flex justify-center items-center mt-6">
								<button
									onClick={goToPrevCartPage}
									disabled={cartCurrentPage === 1}
									className={`p-2 rounded-full ${
										cartCurrentPage === 1
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
									onClick={goToNextCartPage}
									disabled={
										cartCurrentPage === cartTotalPages
									}
									className={`p-2 rounded-full ${
										cartCurrentPage === cartTotalPages
											? "text-gray-500 cursor-not-allowed"
											: "text-white hover:bg-white/10"
									}`}
								>
									<ChevronRight size={20} />
								</button>
							</div>
						)}
					</div>
					<div className="p-6 mb-8 glass-effect">
						<CartSummary
							total={calculateTotal()}
							onClearCart={clearCart}
							onCheckout={proceedToCheckout}
						/>
					</div>

					{showCheckout && (
						<CheckoutForm
							paymentInfo={paymentInfo}
							formErrors={formErrors}
							onInputChange={handleInputChange}
							onSubmit={handlePaymentSubmit}
						/>
					)}
				</div>
			) : (
				<div className="">
					<EmptyCart />
				</div>
			)}
		</>
	);
};

export default CartContent;
