import { useState } from "react";

const useFAQ = () => {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	return {
		openFaq,
		toggleFaq,
	};
};

export default useFAQ;
