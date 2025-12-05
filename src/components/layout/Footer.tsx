"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { showToast } from "@/components/ui/Toast";

export default function Footer() {
	const { isAuthenticated } = useAuth();
	const [isAuth, setIsAuth] = useState(false);
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setIsAuth(isAuthenticated);
	}, [isAuthenticated]);

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			showToast({
				message: "Por favor, introduce un email válido",
				type: "error",
			});
			return;
		}

		setIsSubmitting(true);

		setTimeout(() => {
			showToast({
				message: "¡Te has suscrito correctamente a nuestro newsletter!",
				type: "success",
			});
			setEmail("");
			setIsSubmitting(false);
		}, 1000);
	};

	return (
		<footer className="flex relative flex-col justify-between items-center px-4 py-10 mt-auto w-full">
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]"></div>
			<div className="w-full max-w-md">
				<div className="flex flex-col items-center mb-12">
					<h3 className="mb-4 text-xl font-medium text-white">
						Suscríbete a nuestro newsletter
					</h3>
					<form
						onSubmit={handleSubscribe}
						className="w-full max-w-sm"
					>
						<div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-0">
							<input
								type="email"
								placeholder="Tu correo electrónico"
								className="flex-grow px-4 py-2 text-white rounded-md border sm:rounded-l-md sm:rounded-r-none bg-white/10 border-white/20 focus:outline-none focus:border-pastel-purple"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isSubmitting}
							/>
							<button
								type="submit"
								className="w-full rounded-md newsletter-button sm:w-auto sm:rounded-l-none sm:rounded-r-md"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Procesando..." : "Suscribirse"}
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="flex flex-col items-center mb-12 space-y-4">
				<Link
					href="/home"
					className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
				>
					Inicio
					<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
				</Link>
				<Link
					href="/"
					className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
				>
					Landing
					<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
				</Link>

				<Link
					href="/products"
					className={`relative text-lg transition-colors group ${
						isAuth
							? "text-white hover:text-pastel-purple"
							: "text-white/50 cursor-not-allowed"
					}`}
					onClick={(e) => !isAuth && e.preventDefault()}
				>
					Productos
					{isAuth && (
						<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
					)}
				</Link>

				{isAuth ? (
					<Link
						href="/dashboard"
						className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
					>
						Perfil
						<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
					</Link>
				) : (
					<Link
						href="/login"
						className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
					>
						Iniciar Sesión
						<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
					</Link>
				)}
			</div>

			<div className="text-center">
				<p className="mb-4 text-sm text-white/50">
					Website made by Frysccou, all rights reserved.
				</p>
				<h2 className="text-5xl font-bold text-outline md:text-7xl">
					XView
				</h2>
			</div>
		</footer>
	);
}
