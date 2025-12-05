"use client";
import React from "react";
import CartSummary from "./CartSummary";
import { CartActionProps } from "@/types";

const CartActions: React.FC<CartActionProps> = ({
	total,
	onClearCart,
	onCheckout,
}) => {
	return (
		<CartSummary
			total={total}
			onClearCart={onClearCart}
			onCheckout={onCheckout}
		/>
	);
};

export default CartActions;
