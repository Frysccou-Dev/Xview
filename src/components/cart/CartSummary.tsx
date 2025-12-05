import React from "react";
import { CartSummaryProps } from "@/types";

const CartSummary: React.FC<CartSummaryProps> = ({
	total,
	onClearCart,
	onCheckout,
}) => {
	return (
		<>
			<div className="flex justify-between items-center mt-8 pt-6 border-t border-white/15">
				<button
					onClick={onClearCart}
					className="px-5 py-2.5 text-sm font-medium text-white/80 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
				>
					Vaciar Carrito
				</button>
				<div className="text-right">
					<span className="block text-sm text-white/70">Total</span>
					<span className="text-2xl font-bold text-[var(--pastel-salmon)]">
						${total.toFixed(2)}
					</span>
				</div>
			</div>

			<div className="mt-8">
				<button
					onClick={onCheckout}
					className="w-full px-6 py-3 text-base font-semibold rounded-lg login-button transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-[var(--pastel-purple)]"
				>
					Proceder al Pago
				</button>
			</div>
		</>
	);
};

export default CartSummary;
