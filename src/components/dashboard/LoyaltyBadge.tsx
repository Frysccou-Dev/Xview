import React from "react";
import { BadgeCheck } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const LoyaltyBadge: React.FC = () => {
	const { user } = useAuth();
	const tieneInsignia = user?.orders && user.orders.length >= 3;

	if (!tieneInsignia) {
		return null;
	}

	return (
		<div
			className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] text-white text-xs font-medium"
			title="Cliente VIP"
		>
			<BadgeCheck size={14} />
			<span>Cliente VIP</span>
		</div>
	);
};

export default LoyaltyBadge;
