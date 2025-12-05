import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const EmptyCart: React.FC = () => {
	return (
		<div className="w-full max-w-md text-center">
			<div className="flex flex-col items-center p-8 glass-effect">
				<ShoppingBag
					size={72}
					className="mb-6 text-[var(--pastel-purple)] opacity-80"
				/>
				<h3 className="mb-4 text-xl font-semibold text-white">
					Tu carrito está vacío
				</h3>
				<p className="mb-8 text-white/70">
					Parece que aún no has añadido nada. ¡Explora nuestros
					productos!
				</p>
				<Link
					href="/products"
					className="px-8 py-3 font-medium rounded-md login-button transition-transform duration-200 hover:scale-105"
				>
					Explorar Productos
				</Link>
			</div>
		</div>
	);
};

export default EmptyCart;
