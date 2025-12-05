import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonCardContainer = () => {
	return (
		<div className="flex flex-col md:flex-row md:gap-6 max-w-6xl p-4 lg:px-8 xl:px-16 mx-auto sm:mx-0 justify-center">
			<SkeletonCard />
			<div className="hidden md:block">
				<SkeletonCard />
			</div>
			<div className="hidden md:block">
				<SkeletonCard />
			</div>
			<div className="hidden md:block">
				<SkeletonCard />
			</div>
		</div>
	);
};

export default SkeletonCardContainer;
