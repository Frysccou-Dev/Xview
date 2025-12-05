import React from "react";
import { FormInputProps } from "@/types";

const FormInput = ({
	id,
	type,
	label,
	value,
	onChange,
	placeholder,
	required = false,
	minLength,
	className = "",
}: FormInputProps) => {
	return (
		<div>
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-white"
			>
				{label}
			</label>
			<input
				id={id}
				type={type}
				className={`w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)] ${className}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				minLength={minLength}
			/>
		</div>
	);
};

export default FormInput;