import { showToast } from "@/components/ui/Toast";
import { StorageService } from "@/services/storage.service";
import { IProduct } from "@/types";

const useCart = () => {
	const handleQuickAddToCart = (product: IProduct) => {
		const cart = StorageService.getCart();
		const existingProduct = cart.find((item) => item.id === product.id);

		if (existingProduct) {
			showToast({
				message: "Este producto ya está en el carrito",
				type: "warning",
			});
			return;
		}

		StorageService.addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: 1,
		});

		showToast({
			message: "Producto añadido al carrito",
			type: "success",
		});
	};

	const isInCart = (productId: number): boolean => {
		return StorageService.isProductInCart(productId);
	};

	const addToCart = (product: {
		id: number;
		name: string;
		price: number;
		image: string;
		quantity: number;
	}) => {
		StorageService.addToCart(product);
		showToast({
			message: `${product.name} añadido al carrito`,
			type: "success",
		});
	};

	const removeFromCart = (productId: number, productName?: string) => {
		StorageService.removeFromCart(productId);
		showToast({
			message: productName
				? `${productName} eliminado del carrito`
				: "Producto eliminado del carrito",
			type: "info",
		});
	};

	const handleToggleCartItem = (product: IProduct, e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		const enCarrito = isInCart(product.id);

		if (enCarrito) {
			removeFromCart(product.id, product.name);
			return;
		}

		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: 1,
		});
	};

	return {
		handleQuickAddToCart,
		isInCart,
		addToCart,
		removeFromCart,
		handleToggleCartItem,
	};
};

export default useCart;
