import { useState } from "react";

const usePaymentForm = () => {
	const [paymentInfo, setPaymentInfo] = useState({
		cardNumber: "",
		cardHolder: "",
		expiryDate: "",
		cvv: "",
		dni: "",
		address: "",
	});

	const [formErrors, setFormErrors] = useState({
		cardNumber: false,
		cardHolder: false,
		expiryDate: false,
		cvv: false,
		dni: false,
		address: false,
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = e.target;
		setPaymentInfo((prev) => ({
			...prev,
			[id]: value,
		}));

		setFormErrors((prev) => ({
			...prev,
			[id]: value.trim() === "",
		}));
	};

	const validateForm = () => {
		const newErrors = {
			cardNumber: !paymentInfo.cardNumber,
			cardHolder: !paymentInfo.cardHolder,
			expiryDate: !paymentInfo.expiryDate,
			cvv: !paymentInfo.cvv,
			dni: !paymentInfo.dni,
			address: !paymentInfo.address,
		};

		setFormErrors(newErrors);
		return newErrors;
	};

	return {
		paymentInfo,
		formErrors,
		handleInputChange,
		validateForm,
	};
};

export default usePaymentForm;
