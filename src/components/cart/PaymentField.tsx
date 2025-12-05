import React from "react";
import { PaymentFieldProps } from "@/types";

const PaymentField: React.FC<PaymentFieldProps> = ({
	id,
	label,
	type,
	placeholder,
	value,
	error,
	onChange,
	maxLength,
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-white"
			>
				{label}
			</label>
			<div
				className={`flex items-center px-4 py-2 rounded-md border ${
					error
						? "border-red-500 bg-red-500/10"
						: "bg-white/10 border-white/20"
				}`}
			>
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					className="w-full bg-transparent text-white focus:outline-none"
					value={value}
					onChange={onChange}
					maxLength={maxLength}
				/>
			</div>
			{error && (
				<p className="mt-1 text-xs text-red-500">
					Este campo es obligatorio
				</p>
			)}
		</div>
	);
};

export default PaymentField;
