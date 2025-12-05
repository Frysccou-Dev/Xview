"use client";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { CheckoutSectionProps } from "@/types";

const CheckoutSection: React.FC<CheckoutSectionProps> = ({
	showCheckout,
	paymentInfo,
	formErrors,
	onInputChange,
	onSubmit,
}) => {
	if (!showCheckout) return null;

	return (
		<CheckoutForm
			paymentInfo={paymentInfo}
			formErrors={formErrors}
			onInputChange={onInputChange}
			onSubmit={onSubmit}
		/>
	);
};

export default CheckoutSection;
