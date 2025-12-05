import React from "react";
import Link from "next/link";
import { ButtonSecondaryProps } from "@/types";

const ButtonSecondary = ({
	href,
	children,
	className = "",
	onClick,
}: ButtonSecondaryProps) => {
	return (
		<Link
			href={href}
			className={`px-8 py-3 bg-transparent border-2 border-[var(--pastel-salmon)] text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-[var(--pastel-salmon)] hover:text-white hover:shadow-[var(--pastel-salmon)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--pastel-salmon)] focus:ring-opacity-50 ${className}`}
			onClick={onClick}
		>
			{children}
		</Link>
	);
};

export default ButtonSecondary;