"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ShowComponentProps } from "@/types";
const ShowComponent: React.FC<ShowComponentProps> = ({ children }) => {
	const pathname = usePathname();

	const validRoutes = [
		"/",
		"/home",
		"/products",
		"/cart",
		"/about",
		"/contact",
		"/login",
		"/register",
		"/dashboard",
		"/dashboard/orders",
	];

	const protectedRoutes = [
		"/dashboard",
		"/cart",
		"/contact",
		"/dashboard/orders",
	];

	const isValidProductDetail =
		pathname?.startsWith("/products/") && pathname?.split("/").length === 3;

	const isInvalidDashboardRoute =
		pathname?.startsWith("/dashboard/") &&
		!protectedRoutes.includes(pathname || "");

	const isInvalidProductRoute =
		pathname?.startsWith("/products/") && !isValidProductDetail;

	const showComponents =
		validRoutes.includes(pathname || "") || isValidProductDetail;

	return (
		<>
			{showComponents &&
				!isInvalidDashboardRoute &&
				!isInvalidProductRoute && <Navbar />}
			<main>{children}</main>
			{showComponents &&
				!isInvalidDashboardRoute &&
				!isInvalidProductRoute && <Footer />}
		</>
	);
};

export default ShowComponent;
