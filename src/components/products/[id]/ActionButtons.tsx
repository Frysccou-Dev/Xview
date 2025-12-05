import React, { useState, useEffect, useContext } from "react";
import { ShoppingCart, Heart, Trash2 } from "lucide-react";
import { ActionButtonsProps } from "@/types";
import { StorageService } from "@/services/storage.service";
import { showToast } from "@/components/ui/Toast";
import { CartContext } from "@/context/CartContext";

const ActionButtons: React.FC<ActionButtonsProps> = ({
	onAddToCart,
	product,
}) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

	useEffect(() => {
		if (product) {
			const isInFavorites = StorageService.isProductFavorite(product.id);
			setIsFavorite(isInFavorites);
		}
	}, [product]);

	const handleFavoriteToggle = () => {
		if (!product) return;

		if (isFavorite) {
			StorageService.removeFromFavorites(product.id);
			showToast({
				message: `${product.name} eliminado de favoritos`,
				type: "info",
			});
		} else {
			StorageService.addToFavorites({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				author: product.author,
			});
			showToast({
				message: `${product.name} añadido a favoritos`,
				type: "success",
			});
		}

		setIsFavorite(!isFavorite);
	};

	const handleCartAction = () => {
		if (!product) return;

		if (isInCart(product.id)) {
			removeFromCart(product.id);
			showToast({
				message: `${product.name} eliminado del carrito`,
				type: "info",
			});
			return;
		}

		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: 1,
		});
		onAddToCart();
		showToast({
			message: `${product.name} añadido al carrito`,
			type: "success",
		});
	};

	return (
		<div className="flex flex-col gap-3 sm:flex-row">
			<button
				type="button"
				onClick={handleCartAction}
				className={`flex justify-center items-center px-6 py-3 w-full font-medium rounded-md ${
					product && isInCart(product.id)
						? "bg-gradient-to-r from-[var(--light-purple)] via-[var(--pastel-salmon)] to-[var(--pastel-purple)] opacity-80 hover:opacity-90"
						: "login-button"
				} sm:w-auto`}
			>
				{product && isInCart(product.id) ? (
					<>
						<Trash2 size={20} className="mr-2" />
						<span>Eliminar del carrito</span>
					</>
				) : (
					<>
						<ShoppingCart size={20} className="mr-2" />
						Añadir al carrito
					</>
				)}
			</button>

			<button
				type="button"
				onClick={handleFavoriteToggle}
				className={`flex justify-center items-center px-6 py-3 w-full font-medium text-white rounded-md border border-white/20 ${
					isFavorite
						? "bg-pink-500/20 hover:bg-pink-500/30"
						: "bg-white/5 hover:bg-white/10"
				} sm:w-auto`}
			>
				<Heart
					size={20}
					className={`mr-2 ${isFavorite ? "fill-pink-500" : ""}`}
				/>
				{isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
			</button>
		</div>
	);
};

export default ActionButtons;
