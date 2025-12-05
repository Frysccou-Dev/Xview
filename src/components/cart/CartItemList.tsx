import React from "react";
import CartItem from "./CartItem";
import { CartItem as CartItemType, CartItemListProps } from "@/types";

const CartItemList: React.FC<CartItemListProps> = ({ items, onRemoveItem }) => {
	return (
		<div className="space-y-4">
			{items.map((item) => (
				<CartItem key={item.id} item={item} onRemove={onRemoveItem} />
			))}
		</div>
	);
};

export default CartItemList;
