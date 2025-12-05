import React from "react";
import { UserInfoCardProps } from "@/types";
import LogoutButton from "./LogoutButton";
import LoyaltyBadge from "./LoyaltyBadge";

const UserInfoCard = ({ user, onLogout }: UserInfoCardProps) => {
	return (
		<div className="p-6 mb-8 glass-effect">
			<h2 className="mb-6 text-2xl font-semibold text-center text-white">
				Información Personal
			</h2>

			<div className="space-y-4">
				<div>
					<label className="block mb-2 text-sm font-medium text-white">
						Nombre
					</label>
					<div className="flex items-center justify-between px-4 py-3 w-full text-white rounded-md border bg-white/10 border-white/20">
						<span>{user.name || "No disponible"}</span>
						<LoyaltyBadge />
					</div>
				</div>

				<div>
					<label className="block mb-2 text-sm font-medium text-white">
						Email
					</label>
					<div className="px-4 py-3 w-full text-white rounded-md border bg-white/10 border-white/20">
						{user.email || "No disponible"}
					</div>
				</div>

				<div>
					<label className="block mb-2 text-sm font-medium text-white">
						Contraseña
					</label>
					<div className="px-4 py-3 w-full text-white rounded-md border bg-white/10 border-white/20">
						••••••••
					</div>
				</div>

				<div>
					<label className="block mb-2 text-sm font-medium text-white">
						Dirección
					</label>
					<div className="px-4 py-3 w-full text-white rounded-md border bg-white/10 border-white/20">
						{user.address || "No disponible"}
					</div>
				</div>

				<div>
					<label className="block mb-2 text-sm font-medium text-white">
						Teléfono
					</label>
					<div className="px-4 py-3 w-full text-white rounded-md border bg-white/10 border-white/20">
						{user.phone || "No disponible"}
					</div>
				</div>
			</div>

			<LogoutButton onLogout={onLogout} />
		</div>
	);
};

export default UserInfoCard;
