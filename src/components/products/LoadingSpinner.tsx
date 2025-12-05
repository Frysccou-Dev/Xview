import { FC } from "react";

const LoadingSpinner: FC = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-16 h-16 border-4 border-t-[var(--pastel-purple)] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
		</div>
	);
};

export default LoadingSpinner;
