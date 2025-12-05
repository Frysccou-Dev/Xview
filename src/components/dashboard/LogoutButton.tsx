import React from "react";
import { LogoutButtonProps } from "@/types";

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
	return (
		<div className="mt-6">
			<button
				onClick={onLogout}
				className="px-4 py-2 w-full font-medium text-black rounded-md bg-gradient-to-r from-[#c8b6ff] via-[#d8ccff] to-[#ffb6b9] hover:from-[#d8ccff] hover:via-[#ffb6b9] hover:to-[#ffd1d1] transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-300/30 hover:-translate-y-1 active:translate-y-0"
			>
				Cerrar Sesión
			</button>
		</div>
	);
};

export default LogoutButton;
