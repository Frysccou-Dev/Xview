import React from "react";
import { GradientTextProps } from "@/types";

const GradientText = ({ children, className = "" }: GradientTextProps) => {
	return (
		<span
			className={`text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] ${className}`}
		>
			{children}
		</span>
	);
};

export default GradientText;