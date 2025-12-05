import { FC } from "react";
import { ErrorDisplayProps } from "@/types";

const ErrorDisplay: FC<ErrorDisplayProps> = ({ message }) => {
	return (
		<div className="container mx-auto py-8 px-4 text-center">
			<h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Error
				</span>
			</h1>
			<p className="text-white">{message}</p>
		</div>
	);
};

export default ErrorDisplay;
