// ==========================================
// Modelos de datos principales
// ==========================================
export interface IProduct {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	image: string;
	categoryId: number;
	author: string;
	year: number;
	genres: string[];
}

export interface ICategory {
	id: number;
	name: string;
}

export enum Role {
	ADMIN = "admin",
	USER = "user",
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	address: string;
	phone: string;
	role: Role;
	orders?: IOrder[];
}

export interface IOrder {
	id: number;
	status: string;
	date: Date;
	userId: number;
	products: IProduct[];
	productQuantities?: { [productId: number]: number };
}

// ==========================================
// Autenticación y registro
// ==========================================
export interface LoginResponse {
	login: boolean;
	user: IUser;
	token: string;
}

export interface RegisterData extends Record<string, unknown> {
	email: string;
	password: string;
	name: string;
	address: string;
	phone: string;
}

export interface LoginData extends Record<string, unknown> {
	email: string;
	password: string;
}

export interface AuthContextType {
	user: IUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (data: LoginData) => Promise<LoginResponse | undefined>;
	register: (data: RegisterData) => Promise<LoginResponse | undefined>;
	logout: () => void;
	updateUser: (updatedUser: Partial<IUser>) => void;
	error: string | null;
}

export interface AuthProviderProps {
	children: React.ReactNode;
}

export interface PublicRoutes {
	[key: string]: boolean;
}

// ==========================================
// Pedidos y carrito de compra
// ==========================================

export interface OrderProduct {
	id: number;
	quantity: number;
}

export interface CreateOrderData {
	products: OrderProduct[];
	transactionId?: string;
}

export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

export interface CartActionProps {
	total: number;
	onClearCart: () => void;
	onCheckout: () => void;
}

// ==========================================
// Componentes de UI genéricos
// ==========================================
export interface FormInputProps {
	id: string;
	type: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	required?: boolean;
	minLength?: number;
	className?: string;
	error?: string | false;
}

export interface ErrorDisplayProps {
	message: string;
}

// ==========================================
// Componentes de productos
// ==========================================
export interface ProductCardProps {
	product: IProduct;
	onAddToCart: (product: IProduct) => void;
}

export interface ProductGridProps {
	products: IProduct[];
	onAddToCart: (product: IProduct) => void;
}

export interface ActionButtonsProps {
	onAddToCart: () => void;
	product: IProduct | null;
}

export interface ProductPricingProps {
	product: IProduct;
}

export interface ProductImageGalleryProps {
	product: IProduct;
}

export interface ProductHeaderProps {
	product: IProduct;
}

export interface ProductDescriptionProps {
	product: IProduct;
}

export interface FeaturedMangasSectionProps {
	mangas: IProduct[];
	loading: boolean;
}

// ==========================================
// Componentes de FAQ y contacto
// ==========================================
export interface FAQ {
	question: string;
	answer: string;
}

export interface FAQAccordionProps {
	faqs: FAQ[];
}

// ==========================================
// Servicios y utilidades
// ==========================================
export interface RequestOptions {
	method?: string;
	headers?: Record<string, string>;
	body?: Record<string, unknown>;
}

// ==========================================
// Componentes de Carrito
// ==========================================
export interface CartItemProps {
	item: CartItem;
	onRemove: (id: number) => void;
}

export interface CartItemListProps {
	items: CartItem[];
	onRemoveItem: (id: number) => void;
}

export interface CartSummaryProps {
	total: number;
	onClearCart: () => void;
	onCheckout: () => void;
}

export interface CheckoutFormProps {
	paymentInfo: {
		cardNumber: string;
		cardHolder: string;
		expiryDate: string;
		cvv: string;
		dni: string;
		address: string;
	};
	formErrors: {
		cardNumber: boolean;
		cardHolder: boolean;
		expiryDate: boolean;
		cvv: boolean;
		dni: boolean;
		address: boolean;
	};
	onInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface CheckoutSectionProps {
	showCheckout: boolean;
	paymentInfo: {
		cardNumber: string;
		cardHolder: string;
		expiryDate: string;
		cvv: string;
		dni: string;
		address: string;
	};
	formErrors: {
		cardNumber: boolean;
		cardHolder: boolean;
		expiryDate: boolean;
		cvv: boolean;
		dni: boolean;
		address: boolean;
	};
	onInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface PaymentCardProps {
	cardNumber: string;
	cardHolder: string;
	expiryDate: string;
	cvv: string;
	isFlipped: boolean;
}

export interface PaymentFieldProps {
	id: string;
	label: string;
	type: string;
	placeholder: string;
	value: string;
	error: boolean;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	maxLength?: number;
}

export interface CartViewProps {
	showTitle?: boolean;
}

// ==========================================
// Componentes de Dashboard
// ==========================================
export interface LogoutButtonProps {
	onLogout: () => void;
}

export interface ProfileAvatarProps {
	user: IUser;
}

export interface UserInfoCardProps {
	user: IUser;
	onLogout: () => void;
}

export interface OrdersFilterProps {
	searchQuery: string;
	sortOption: OrderSortOption;
	priceRange?: {
		min: number | null;
		max: number | null;
	};
	onSearchChange: (query: string) => void;
	onSortChange: (option: OrderSortOption) => void;
	onPriceRangeChange?: (min: number | null, max: number | null) => void;
}

export interface OrdersListProps {
	orders: IOrder[];
}

// ==========================================
// Componentes de Layout
// ==========================================
export interface ShowComponentProps {
	children: React.ReactNode;
}

// ==========================================
// Componentes de UI
// ==========================================
export interface ButtonPrimaryProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export interface ButtonSecondaryProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export interface CardProps {
	id: string;
	title?: string;
	imageUrl: string;
	className?: string;
}

export interface GradientTextProps {
	children: React.ReactNode;
	className?: string;
}

export interface SidebarProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export interface ToastProps {
	message: string;
	type?: "success" | "error" | "warning" | "info";
	autoClose?: number;
	position?:
		| "top-right"
		| "top-center"
		| "top-left"
		| "bottom-right"
		| "bottom-center"
		| "bottom-left";
}

export interface ToastProviderProps {
	children: React.ReactNode;
}

export interface WelcomeAnimationProps {
	onComplete: () => void;
}

// ==========================================
// Contextos
// ==========================================
export interface CartContextType {
	cartItems: CartItem[];
	cartCount: number;
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
	isInCart: (id: number) => boolean;
	calculateTotal: () => number;
}

// ==========================================
// Hooks
// ==========================================
export type OrderSortOption =
	| "date-desc"
	| "date-asc"
	| "price-desc"
	| "price-asc"
	| "quantity-desc"
	| "quantity-asc";

export type SortOption =
	| "relevancy"
	| "price-low-high"
	| "price-high-low"
	| "name-a-z"
	| "name-z-a"
	| "stock-low-high"
	| "stock-high-low";

export interface ProductFilters {
	categories: number[];
	genres: string[];
	searchQuery: string;
	sortOption: SortOption;
	priceRange: {
		min: number | null;
		max: number | null;
	};
}


