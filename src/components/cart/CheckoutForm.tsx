import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import PaymentField from "./PaymentField";
import PaymentCard from "./PaymentCard";
import { showToast } from "../ui/Toast";
import { CheckoutFormProps } from "@/types";

const CheckoutForm: React.FC<CheckoutFormProps> = ({
	paymentInfo,
	formErrors,
	onInputChange,
	onSubmit,
}) => {
	const [showCardBack, setShowCardBack] = useState(false);

	const handleCvvFocus = () => setShowCardBack(true);
	const handleCvvBlur = () => setShowCardBack(false);

	const validateForm = (e: React.FormEvent) => {
		e.preventDefault();

		const errors = [];

		if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ""))) {
			errors.push("El número de tarjeta debe tener 16 dígitos");
		}

		if (
			!/^[A-Za-zÁÉÍÓÚáéíóúÑñ'´` ]+$/.test(paymentInfo.cardHolder.trim())
		) {
			errors.push("Ingresa un nombre válido para el titular");
		}

		if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
			errors.push("La fecha de expiración debe tener formato MM/AA");
		} else {
			const [month, year] = paymentInfo.expiryDate.split("/");
			const expiryDate = new Date(
				2000 + parseInt(year),
				parseInt(month) - 1
			);
			const currentDate = new Date();

			if (expiryDate < currentDate) {
				errors.push("La tarjeta ha expirado");
			}
		}

		if (!/^\d{3}$/.test(paymentInfo.cvv)) {
			errors.push("El CVV debe tener 3 dígitos");
		}

		if (!/^\d{8}$/.test(paymentInfo.dni)) {
			errors.push("El DNI debe tener 8 dígitos");
		}

		if (paymentInfo.address.length < 10) {
			errors.push("La dirección es demasiado corta");
		}

		if (errors.length > 0) {
			errors.forEach((error) => {
				showToast({ message: error, type: "error" });
			});
			return;
		}

		onSubmit(e);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = e.target;

		if (id === "cardNumber") {
			const digitsOnly = value.replace(/\D/g, "");
			let formattedValue = "";

			for (let i = 0; i < digitsOnly.length && i < 16; i++) {
				if (i > 0 && i % 4 === 0) {
					formattedValue += " ";
				}
				formattedValue += digitsOnly[i];
			}

			const syntheticEvent = {
				...e,
				target: {
					...e.target,
					id: "cardNumber",
					value: formattedValue,
				},
			} as React.ChangeEvent<HTMLInputElement>;

			onInputChange(syntheticEvent);
			return;
		}

		if (id === "expiryDate") {
			const digitsOnly = value.replace(/\D/g, "");
			let formattedValue = "";

			if (digitsOnly.length > 0) {
				const month = digitsOnly.substring(
					0,
					Math.min(2, digitsOnly.length)
				);
				formattedValue = month;

				if (digitsOnly.length > 2) {
					const year = digitsOnly.substring(
						2,
						Math.min(4, digitsOnly.length)
					);
					formattedValue = `${month}/${year}`;
				}
			}

			const syntheticEvent = {
				...e,
				target: {
					...e.target,
					id: "expiryDate",
					value: formattedValue,
				},
			} as React.ChangeEvent<HTMLInputElement>;

			onInputChange(syntheticEvent);
			return;
		}

		if (id === "dni") {
			const digitsOnly = value.replace(/\D/g, "");

			const syntheticEvent = {
				...e,
				target: {
					...e.target,
					id: "dni",
					value: digitsOnly.substring(0, 8),
				},
			} as React.ChangeEvent<HTMLInputElement>;

			onInputChange(syntheticEvent);
			return;
		}

		onInputChange(e);
	};

	return (
		<div className="p-6 mb-8 glass-effect">
			<h2 className="mb-6 text-2xl font-semibold text-center text-white">
				Información de Pago
			</h2>

			<PaymentCard
				cardNumber={paymentInfo.cardNumber}
				cardHolder={paymentInfo.cardHolder}
				expiryDate={paymentInfo.expiryDate}
				cvv={paymentInfo.cvv}
				isFlipped={showCardBack}
			/>

			<form onSubmit={validateForm} className="space-y-4">
				<div>
					<label
						htmlFor="cardNumber"
						className="block mb-2 text-sm font-medium text-white"
					>
						Número de Tarjeta
					</label>
					<div
						className={`flex items-center px-4 py-2 rounded-md border ${
							formErrors.cardNumber
								? "border-red-500 bg-red-500/10"
								: "bg-white/10 border-white/20"
						}`}
					>
						<CreditCard
							size={20}
							className="mr-2 text-[var(--pastel-purple)]"
						/>
						<input
							id="cardNumber"
							type="text"
							placeholder="1234 5678 9012 3456"
							className="w-full bg-transparent text-white focus:outline-none"
							value={paymentInfo.cardNumber}
							onChange={handleInputChange}
							maxLength={19}
						/>
					</div>
					{formErrors.cardNumber && (
						<p className="mt-1 text-xs text-red-500">
							Este campo es obligatorio
						</p>
					)}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<PaymentField
						id="cardHolder"
						label="Titular de la Tarjeta"
						type="text"
						placeholder="Nombre completo"
						value={paymentInfo.cardHolder}
						error={formErrors.cardHolder}
						onChange={onInputChange}
					/>
					<PaymentField
						id="dni"
						label="DNI"
						type="text"
						placeholder="12345678"
						value={paymentInfo.dni}
						error={formErrors.dni}
						onChange={handleInputChange}
						maxLength={8}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label
							htmlFor="expiryDate"
							className="block mb-2 text-sm font-medium text-white"
						>
							Fecha de Expiración
						</label>
						<div
							className={`flex items-center px-4 py-2 rounded-md border ${
								formErrors.expiryDate
									? "border-red-500 bg-red-500/10"
									: "bg-white/10 border-white/20"
							}`}
						>
							<input
								id="expiryDate"
								type="text"
								placeholder="MM/AA"
								className="w-full bg-transparent text-white focus:outline-none"
								value={paymentInfo.expiryDate}
								onChange={handleInputChange}
								maxLength={5}
							/>
						</div>
						{formErrors.expiryDate && (
							<p className="mt-1 text-xs text-red-500">
								Este campo es obligatorio
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="cvv"
							className="block mb-2 text-sm font-medium text-white"
						>
							CVV
						</label>
						<div
							className={`flex items-center px-4 py-2 rounded-md border ${
								formErrors.cvv
									? "border-red-500 bg-red-500/10"
									: "bg-white/10 border-white/20"
							}`}
						>
							<input
								id="cvv"
								type="text"
								placeholder="123"
								className="w-full bg-transparent text-white focus:outline-none"
								value={paymentInfo.cvv}
								onChange={handleInputChange}
								onFocus={handleCvvFocus}
								onBlur={handleCvvBlur}
								maxLength={3}
							/>
						</div>
						{formErrors.cvv && (
							<p className="mt-1 text-xs text-red-500">
								Este campo es obligatorio
							</p>
						)}
					</div>
				</div>

				<div>
					<label
						htmlFor="address"
						className="block mb-2 text-sm font-medium text-white"
					>
						Dirección de Envío
					</label>
					<textarea
						id="address"
						rows={3}
						placeholder="Calle, número, piso, código postal, ciudad"
						className={`w-full px-4 py-2 rounded-md text-white focus:outline-none ${
							formErrors.address
								? "border-red-500 bg-red-500/10"
								: "bg-white/10 border-white/20"
						}`}
						value={paymentInfo.address}
						onChange={onInputChange}
					/>
					{formErrors.address && (
						<p className="mt-1 text-xs text-red-500">
							Este campo es obligatorio
						</p>
					)}
				</div>

				<div className="p-4 rounded-md bg-white/5 border border-[var(--pastel-purple)]/30">
					<p className="text-white/80">
						<span className="font-medium text-[var(--pastel-purple)]">
							Nota:
						</span>{" "}
						Tu pedido será entregado en un plazo de 3 días hábiles
						después de confirmar la compra.
					</p>
				</div>

				<div>
					<button
						type="submit"
						className="w-full px-4 py-3 font-medium rounded-md login-button"
					>
						Confirmar Compra
					</button>
				</div>
			</form>
		</div>
	);
};

export default CheckoutForm;
