"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useCart from "@/hooks/useCart";
import { IOrder, IProduct } from "@/types";
import { RotateCcw } from "lucide-react";

interface RepeatOrderProps {
	order: IOrder;
}

const RepeatOrder: React.FC<RepeatOrderProps> = ({ order }) => {
	const router = useRouter();
	const { addToCart, cartItems } = useCart();

	const handleRepeatOrder = () => {
		if (!order || !order.products) {
			toast.error("No se pueden repetir los productos de esta orden.");
			return;
		}

		let itemsAdded = 0;
		order.products.forEach((product: IProduct) => {
			const isInCart = cartItems.some((item) => item.id === product.id);
			if (!isInCart) {
				const quantity = order.productQuantities?.[product.id] || 1;
				addToCart({
					id: product.id,
					name: product.name,
					price: product.price,
					image: product.image,
					quantity: quantity,
				},
				{ silent: true }
			);
				itemsAdded++;
			}
		});

		if (itemsAdded > 0) {
			toast.success(
				`Orden Repetida: ${itemsAdded} producto(s) nuevo(s) añadido(s) al carrito.`
			);
		} else {
			toast.info(
				"Todos los productos de esta orden ya están en tu carrito."
			);
		}

		router.push("/cart");
	};

	return (
		<button onClick={handleRepeatOrder} className="btn-repeat-order">
			<RotateCcw size={16} />
			Repetir Orden
		</button>
	);
};

export default RepeatOrder;
