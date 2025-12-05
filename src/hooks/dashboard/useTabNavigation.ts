import { useState } from "react";

const useTabNavigation = (initialTab: string = "profile") => {
	const [activeTab, setActiveTab] = useState(initialTab);

	return {
		activeTab,
		setActiveTab,
	};
};

export default useTabNavigation;
