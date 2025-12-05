"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiService } from "@/services/api.service";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FormInput } from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import { showToast } from "@/components/ui/Toast";
import GradientText from "@/components/ui/GradientText";

export default function RegisterContent() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/home");
		}
	}, [isAuthenticated, router]);

	const initialValues = {
		email: "",
		password: "",
		name: "",
		address: "",
		phone: "",
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"El correo electrónico es inválido"
			)
			.required("El correo electrónico es obligatorio"),
		password: Yup.string()
			.min(6, "La contraseña debe tener al menos 6 caracteres")
			.matches(
				/[A-Z]/,
				"La contraseña debe contener al menos una letra mayúscula"
			)
			.matches(/[0-9]/, "La contraseña debe contener al menos un número")
			.matches(
				/[!@#$%^&*(),.?":{}|<>]/,
				"La contraseña debe contener al menos un carácter especial"
			)
			.required("La contraseña es obligatoria"),
		name: Yup.string().required("El nombre es obligatorio"),
		address: Yup.string().required("La dirección es obligatoria"),
		phone: Yup.string()
			.matches(/^[0-9+\s-]+$/, "El teléfono solo debe contener números")
			.required("El número de teléfono es obligatorio"),
	});

	const onSubmit = async (
		values: typeof initialValues,
		{ setSubmitting }: FormikHelpers<typeof initialValues>
	) => {
		try {
			await ApiService.register(values);
			showToast({
				message:
					"¡Registro exitoso! Redirigiendo al inicio de sesión...",
				type: "success",
			});
			setTimeout(() => {
				router.push("/login?registered=true");
			}, 1500);
		} catch (error) {
			let errorMessage = "Error durante el registro";

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (
				typeof error === "object" &&
				error !== null &&
				"message" in error
			) {
				errorMessage = String((error as any).message);
			}

			showToast({
				message: errorMessage,
				type: "error",
			});

			setSubmitting(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row-reverse items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
			<div className="p-8 w-full max-w-md shadow-xl glass-effect md:ml-8">
				<h1 className="mb-6 text-3xl font-bold text-center text-white">
					<GradientText>Registro</GradientText>
				</h1>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({
						values,
						handleChange,
						isSubmitting,
						errors,
						touched,
						handleSubmit,
						validateForm,
					}) => (
						<Form
							className="space-y-6"
							onSubmit={async (e) => {
								e.preventDefault();
								const errors = await validateForm();

								if (Object.keys(errors).length > 0) {
									const firstError = Object.values(errors)[0];
									showToast({
										message: firstError as string,
										type: "error",
									});
									return;
								}

								handleSubmit();
							}}
						>
							<FormInput
								id="email"
								type="email"
								label="Correo Electrónico"
								placeholder="tu@email.com"
								value={values.email}
								onChange={handleChange}
								error={touched.email && errors.email}
								required
							/>
							<FormInput
								id="password"
								type="password"
								label="Contraseña"
								placeholder="••••••••"
								value={values.password}
								onChange={handleChange}
								error={touched.password && errors.password}
								required
							/>
							<FormInput
								id="name"
								type="text"
								label="Nombre"
								placeholder="Tu nombre completo"
								value={values.name}
								onChange={handleChange}
								error={touched.name && errors.name}
								required
							/>
							<FormInput
								id="address"
								type="text"
								label="Dirección"
								placeholder="Tu dirección"
								value={values.address}
								onChange={handleChange}
								error={touched.address && errors.address}
								required
							/>
							<FormInput
								id="phone"
								type="tel"
								label="Número de Teléfono"
								placeholder="+34 123 456 789"
								value={values.phone}
								onChange={handleChange}
								error={touched.phone && errors.phone}
								required
							/>
							<div>
								<button
									type="submit"
									className="px-4 py-2 w-full font-medium rounded-md login-button"
									disabled={isSubmitting}
								>
									{isSubmitting
										? "Registrando..."
										: "Registrarse"}
								</button>
							</div>
						</Form>
					)}
				</Formik>

				<div className="mt-6 text-center">
					<p className="text-white/70">
						¿Ya tienes una cuenta?{" "}
						<Link
							href="/login"
							className="text-[var(--pastel-purple)] hover:text-[var(--light-purple)]"
						>
							Inicia sesión
						</Link>
					</p>
				</div>
			</div>

			<div className="hidden w-full max-w-md md:block">
				<Image
					src="/Mockup3d.png"
					alt="XView Mockup"
					width={400}
					height={400}
					className="object-contain"
				/>
			</div>
		</div>
	);
}
