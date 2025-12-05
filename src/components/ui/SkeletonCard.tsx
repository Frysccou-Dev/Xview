import React from "react";

const SkeletonCard = () => {
	return (
		<div className="p-4 mb-6 min-w-[280px] sm:w-64 h-102 card-glass-effect sm:h-112 flex flex-col justify-between shadow-lg rounded-lg mx-auto">
			<div className="h-3/5 bg-gradient-to-r from-gray-300 to-gray-500 rounded-md animate-pulse"></div>
			<div className="mt-4 space-y-2">
				<div className="h-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-md w-3/4 animate-pulse"></div>
				<div className="h-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-md w-1/2 animate-pulse"></div>
			</div>
		</div>
	);
};

export default SkeletonCard;
