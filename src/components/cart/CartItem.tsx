import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType, CartItemProps } from "@/types";

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
	return (
		<div className="flex flex-row items-center p-3 rounded-lg border bg-white/5 border-white/10 sm:p-4 sm:flex-row">
			<div className="relative flex-shrink-0 w-16 h-16 sm:mb-0 sm:w-32 sm:h-32">
				<Image
					src={item.image}
					alt={item.name}
					fill
					sizes="(max-width: 640px) 64px, 128px"
					style={{
						objectFit: "cover",
						borderRadius: "8px",
					}}
				/>
			</div>
			<div className="flex flex-col flex-grow justify-between ml-3 sm:ml-4">
				<div>
					<h3 className="text-base font-medium text-white line-clamp-2 sm:text-xl sm:line-clamp-none">
						{item.name}
					</h3>
					<p className="text-sm font-bold text-[var(--pastel-salmon)] mt-1 sm:text-lg sm:mt-0">
						${item.price}
					</p>
				</div>
				<div className="flex justify-between items-center mt-2 sm:mt-4">
					<div className="flex items-center">
						<span className="text-xs text-white sm:text-base">
							Cantidad: {item.quantity}
						</span>
					</div>
					<button
						onClick={() => onRemove(item.id)}
						className="flex justify-center items-center p-1 text-[var(--pastel-salmon)] rounded-full hover:bg-white/10 sm:p-2"
					>
						<Trash2 size={16} className="sm:size-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
