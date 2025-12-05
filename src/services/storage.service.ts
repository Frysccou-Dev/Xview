export const StorageService = {
	setFavorites: (favorites: {
		id: number;
		name: string;
		price: number;
		image: string;
		author: string;
	}[]): void => {
		if (typeof document !== "undefined") {
			const expires = new Date();
			expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
			document.cookie = `favorites=${JSON.stringify(
				favorites
			)};expires=${expires.toUTCString()};path=/`;
		}
	},

	getFavorites: (): {
		id: number;
		name: string;
		price: number;
		image: string;
		author: string;
	}[] => {
		if (typeof document !== "undefined") {
			const match = document.cookie.match(/(^|;)\s*favorites\s*=\s*([^;]+)/);
			return match ? JSON.parse(decodeURIComponent(match[2])) : [];
		}
		return [];
	},

	addToFavorites: (product: {
		id: number;
		name: string;
		price: number;
		image: string;
		author: string;
	}): void => {
		const favorites = StorageService.getFavorites();
		const existingProduct = favorites.find((item) => item.id === product.id);

		if (!existingProduct) {
			favorites.push(product);
			StorageService.setFavorites(favorites);
		}
	},

	removeFromFavorites: (productId: number): void => {
		const favorites = StorageService.getFavorites();
		const updatedFavorites = favorites.filter((item) => item.id !== productId);
		StorageService.setFavorites(updatedFavorites);
	},

	isProductFavorite: (productId: number): boolean => {
		const favorites = StorageService.getFavorites();
		return favorites.some((item) => item.id === productId);
	},

	clearFavorites: (): void => {
		if (typeof document !== "undefined") {
			document.cookie = "favorites=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
		}
	},
	
	setToken: (token: string): void => {
		if (typeof document !== "undefined") {
			const expires = new Date();
			expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
			document.cookie = `token=${token};expires=${expires.toUTCString()};path=/`;
		}
	},

	getToken: (): string | null => {
		if (typeof document !== "undefined") {
			const match = document.cookie.match(/(^|;)\s*token\s*=\s*([^;]+)/);
			return match ? match[2] : null;
		}
		return null;
	},

	removeToken: (): void => {
		if (typeof document !== "undefined") {
			document.cookie =
				"token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
		}
	},

	setUserData: (userData: {
		id: number;
		email: string;
		name: string;
	}): void => {
		if (typeof document !== "undefined") {
			const expires = new Date();
			expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
			document.cookie = `userData=${JSON.stringify(
				userData
			)};expires=${expires.toUTCString()};path=/`;
		}
	},

	getUserData: (): { id: number; email: string; name: string } | null => {
		if (typeof document !== "undefined") {
			const match = document.cookie.match(
				/(^|;)\s*userData\s*=\s*([^;]+)/
			);
			return match ? JSON.parse(decodeURIComponent(match[2])) : null;
		}
		return null;
	},

	removeUserData: (): void => {
		if (typeof document !== "undefined") {
			document.cookie =
				"userData=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
		}
	},

	setCart: (
		cart: {
			id: number;
			name: string;
			price: number;
			quantity: number;
			image: string;
		}[]
	): void => {
		if (typeof document !== "undefined") {
			const expires = new Date();
			expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
			document.cookie = `cart=${JSON.stringify(
				cart
			)};expires=${expires.toUTCString()};path=/`;
		}
	},

	getCart: (): {
		id: number;
		name: string;
		price: number;
		quantity: number;
		image: string;
	}[] => {
		if (typeof document !== "undefined") {
			const match = document.cookie.match(/(^|;)\s*cart\s*=\s*([^;]+)/);
			return match ? JSON.parse(decodeURIComponent(match[2])) : [];
		}
		return [];
	},

	addToCart: (product: {
		id: number;
		name: string;
		price: number;
		image: string;
		quantity?: number;
	}): void => {
		const cart = StorageService.getCart();
		const existingProduct = cart.find((item) => item.id === product.id);

		if (existingProduct) {
			existingProduct.quantity = 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}

		StorageService.setCart(cart);
	},

	removeFromCart: (productId: number): void => {
		const cart = StorageService.getCart();
		const updatedCart = cart.filter((item) => item.id !== productId);
		StorageService.setCart(updatedCart);
	},

	clearCart: (): void => {
		if (typeof document !== "undefined") {
			document.cookie =
				"cart=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
		}
	},

	clearSession: (): void => {
		StorageService.removeToken();
		StorageService.removeUserData();
		StorageService.clearCart();
		StorageService.clearFavorites();
	},

	isProductInCart: (productId: number): boolean => {
		const cart = StorageService.getCart();
		return cart.some((item) => item.id === productId);
	}
};
