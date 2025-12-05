import React from "react";
import Link from "next/link";
import { ButtonPrimaryProps } from "@/types";

const ButtonPrimary = ({
	href,
	children,
	className = "",
	onClick,
}: ButtonPrimaryProps) => {
	return (
		<Link
			href={href}
			className={`px-8 py-3 bg-[var(--light-purple)] border-2 border-[var(--light-purple)] text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--light-purple)] focus:ring-opacity-50 ${className}`}
			onClick={onClick}
		>
			{children}
		</Link>
	);
};

export default ButtonPrimary;