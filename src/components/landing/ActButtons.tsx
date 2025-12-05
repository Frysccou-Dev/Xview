"use client";

import React from "react";
import useAuth from "@/hooks/useAuth";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui";

const ActButtons = () => {
	const { isAuthenticated } = useAuth();

	return (
		<div className="flex flex-col gap-4 justify-center sm:flex-row">
			{isAuthenticated ? (
				<>
					<ButtonPrimary href="/dashboard">Mi perfil</ButtonPrimary>
					<ButtonSecondary href="/products">
						Productos
					</ButtonSecondary>
				</>
			) : (
				<>
					<ButtonPrimary href="/login">Unete Ya!</ButtonPrimary>
					<ButtonSecondary href="/home">Novedades</ButtonSecondary>
				</>
			)}
		</div>
	);
};

export default ActButtons;
