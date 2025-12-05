"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
	ShoppingBag,
	User,
	Menu,
	X,
	LogOut,
	LogIn,
	UserPlus,
} from "lucide-react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { isAuthenticated, logout } = useAuth();
	const { cartCount } = useCart();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const profileRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = () => {
		logout();
	};

	const handleProfileMouseEnter = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsProfileOpen(true);
	};

	const handleProfileMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsProfileOpen(false);
		}, 300);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				isMenuOpen
			) {
				setIsMenuOpen(false);
			}
			if (
				profileRef.current &&
				!profileRef.current.contains(event.target as Node) &&
				isProfileOpen
			) {
				setIsProfileOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen, isProfileOpen]);

	return (
		<nav className="flex relative flex-col w-full">
			<div className="flex relative items-center px-4 py-4 w-full">
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-white transition-colors hover:text-pastel-purple"
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				<div className="hidden justify-center w-full md:flex">
					<div className="flex items-center space-x-12 ml-[48px]">
						<Popover
							className="relative"
							as="div"
							onMouseEnter={handleProfileMouseEnter}
							onMouseLeave={handleProfileMouseLeave}
							ref={profileRef}
						>
							<Popover.Button className="flex relative items-center text-lg text-white transition-colors hover:text-pastel-purple group focus:outline-none cursor-pointer">
								<User size={24} className="mr-2" />
								Perfil
								<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
							</Popover.Button>

							<Transition
								show={isProfileOpen}
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel
									static
									className="absolute z-10 mt-2 w-60 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-white/10"
								>
									<div
										className="py-1"
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="options-menu"
									>
										{isAuthenticated ? (
											<>
												<Link
													href="/dashboard"
													className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
												>
													<p className="font-semibold text-white flex items-center">
														<User
															size={16}
															className="mr-2"
														/>
														Ver Perfil
													</p>
													<p className="text-white/50 text-sm ml-6">
														Gestiona tu información
														personal
													</p>
												</Link>
												<button
													onClick={handleLogout}
													className="block rounded-lg py-2 px-3 transition hover:bg-white/5 w-full text-left cursor-pointer"
												>
													<p className="font-semibold text-white flex items-center">
														<LogOut
															size={16}
															className="mr-2"
														/>
														Cerrar Sesión
													</p>
													<p className="text-white/50 text-sm ml-6">
														Finaliza tu sesión
														actual
													</p>
												</button>
											</>
										) : (
											<>
												<Link
													href="/login"
													className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
												>
													<p className="font-semibold text-white flex items-center">
														<LogIn
															size={16}
															className="mr-2"
														/>
														Iniciar Sesión
													</p>
													<p className="text-white/50 text-sm ml-6">
														Accede a tu cuenta
													</p>
												</Link>
												<Link
													href="/register"
													className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
												>
													<p className="font-semibold text-white flex items-center">
														<UserPlus
															size={16}
															className="mr-2"
														/>
														Registrarse
													</p>
													<p className="text-white/50 text-sm ml-6">
														Crea una nueva cuenta
													</p>
												</Link>
											</>
										)}
									</div>
								</Popover.Panel>
							</Transition>
						</Popover>

						<Link
							href="/home"
							className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
						>
							Inicio
							<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
						</Link>

						<Link
							href="/products"
							className={`relative text-lg transition-colors group ${
								isAuthenticated
									? "text-white hover:text-pastel-purple"
									: "text-white/50 cursor-not-allowed"
							}`}
							onClick={(e) =>
								!isAuthenticated && e.preventDefault()
							}
						>
							Catálogo
							{isAuthenticated && (
								<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
							)}
						</Link>

						<Link
							href="/contact"
							className={`relative text-lg transition-colors group ${
								isAuthenticated
									? "text-white hover:text-pastel-purple"
									: "text-white/50 cursor-not-allowed"
							}`}
							onClick={(e) =>
								!isAuthenticated && e.preventDefault()
							}
						>
							Contacto
							{isAuthenticated && (
								<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
							)}
						</Link>

						<Link
							href="/cart"
							className={`flex relative items-center text-lg transition-colors group ${
								isAuthenticated
									? "text-white hover:text-pastel-purple"
									: "text-white/50 cursor-not-allowed"
							}`}
							onClick={(e) =>
								!isAuthenticated && e.preventDefault()
							}
						>
							<div className="relative">
								<ShoppingBag size={24} className="mr-2" />
								{cartCount > 0 && isAuthenticated && (
									<div className="absolute -top-2 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
										{cartCount}
									</div>
								)}
							</div>
							Carrito
							{isAuthenticated && (
								<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
							)}
						</Link>
					</div>
				</div>
			</div>

			<div
				ref={menuRef}
				className={`md:hidden ${
					isMenuOpen ? "flex" : "hidden"
				} flex-col items-center space-y-4 py-4`}
			>
				{isAuthenticated ? (
					<>
						<Link
							href="/dashboard"
							className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
							onClick={() => setIsMenuOpen(false)}
						>
							Ver Perfil
							<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
						</Link>
						<button
							onClick={() => {
								logout();
								setIsMenuOpen(false);
							}}
							className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
						>
							Cerrar Sesión
							<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
						</button>
					</>
				) : (
					<>
						<Link
							href="/login"
							className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
							onClick={() => setIsMenuOpen(false)}
						>
							Iniciar Sesión
							<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
						</Link>
						<Link
							href="/register"
							className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
							onClick={() => setIsMenuOpen(false)}
						>
							Registrarse
							<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
						</Link>
					</>
				)}

				<Link
					href="/home"
					className="relative text-lg text-white transition-colors hover:text-pastel-purple group"
					onClick={() => setIsMenuOpen(false)}
				>
					Inicio
					<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
				</Link>

				<Link
					href="/products"
					className={`relative text-lg transition-colors group ${
						isAuthenticated
							? "text-white hover:text-pastel-purple"
							: "text-white/50 cursor-not-allowed"
					}`}
					onClick={(e) => {
						if (!isAuthenticated) e.preventDefault();
						else setIsMenuOpen(false);
					}}
				>
					Catálogo
					{isAuthenticated && (
						<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
					)}
				</Link>

				<Link
					href="/contact"
					className={`relative text-lg transition-colors group ${
						isAuthenticated
							? "text-white hover:text-pastel-purple"
							: "text-white/50 cursor-not-allowed"
					}`}
					onClick={(e) => {
						if (!isAuthenticated) e.preventDefault();
						else setIsMenuOpen(false);
					}}
				>
					Contacto
					{isAuthenticated && (
						<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
					)}
				</Link>

				<Link
					href="/cart"
					className={`relative text-lg transition-colors group ${
						isAuthenticated
							? "text-white hover:text-pastel-purple"
							: "text-white/50 cursor-not-allowed"
					}`}
					onClick={(e) => {
						if (!isAuthenticated) e.preventDefault();
						else setIsMenuOpen(false);
					}}
				>
					<div className="flex items-center">
						<div className="relative">
							<ShoppingBag size={20} className="mr-2" />
							{cartCount > 0 && isAuthenticated && (
								<div className="absolute -top-2 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
									{cartCount}
								</div>
							)}
						</div>
						Carrito
					</div>
					{isAuthenticated && (
						<span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] group-hover:w-full transition-all duration-300"></span>
					)}
				</Link>
			</div>

			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]"></div>
		</nav>
	);
}
