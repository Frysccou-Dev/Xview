import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { ProductCardProps } from "@/types";
import useCart from "@/hooks/useCart";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const { isInCart, addToCart, removeFromCart } = useCart();
	const enCarrito = isInCart(product.id);

	const handleToggleCartItem = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (enCarrito) {
			removeFromCart(product.id);
		} else {
			addToCart({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				quantity: 1,
			});
		}
	};

	return (
		<div className="card-glass-effect overflow-hidden hover:shadow-lg transition-shadow">
			<Link href={`/products/${product.id}`}>
				<div className="aspect-square relative">
					<Image
						src={product.image}
						alt={product.name}
						className="object-cover w-full h-full"
						fill
					/>
				</div>
			</Link>
			<div className="p-4">
				<Link href={`/products/${product.id}`}>
					<h3 className="font-semibold text-lg bg-gradient-to-r from-[var(--pastel-purple)] via-[var(--pastel-salmon)] to-[var(--light-purple)] bg-clip-text text-transparent hover:from-[var(--light-salmon)] hover:via-[var(--pastel-purple)] hover:to-[var(--pastel-salmon)]">
						{product.name}
					</h3>
				</Link>
				<div className="flex justify-between items-center mt-2">
					<span className="font-bold text-lg text-white">
						$
						{typeof product.price === "number"
							? product.price.toFixed(2)
							: product.price}
					</span>
					<div className="flex gap-2">
						{product.year && (
							<span className="text-sm bg-purple-900/30 px-2 py-1 rounded text-white">
								{product.year}
							</span>
						)}
					</div>
				</div>
				<div className="mt-4 flex flex-col gap-2">
					<button
						onClick={handleToggleCartItem}
						className={`flex justify-center items-center w-full px-4 py-2.5 font-medium text-white rounded-full shadow-lg transition-all duration-300 ease-in-out ${
							enCarrito
								? "bg-gradient-to-r from-[var(--light-purple)] via-[var(--pastel-salmon)] to-[var(--pastel-purple)] opacity-80 hover:opacity-90"
								: "bg-gradient-to-r from-[var(--pastel-purple)] via-[var(--pastel-salmon)] to-[var(--light-purple)] hover:from-[var(--light-salmon)] hover:via-[var(--pastel-purple)] hover:to-[var(--pastel-salmon)]"
						} hover:shadow-[0_8px_20px_-6px_rgba(200,182,255,0.6)] hover:translate-y-[-2px]`}
					>
						{enCarrito ? (
							<>
								<Trash2 size={16} className="mr-2" />
								<span className="font-medium">
									Eliminar del carrito
								</span>
							</>
						) : (
							<>
								<ShoppingCart
									size={16}
									className="mr-2 text-white/90"
								/>
								<span className="text-white/90 font-medium">
									Añadir al carrito
								</span>
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
