"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FormInput } from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import { showToast } from "@/components/ui/Toast";
import WelcomeAnimation from "@/components/ui/WelcomeAnimation";
import GradientText from "@/components/ui/GradientText";

export default function LoginContent() {
	const router = useRouter();
	const { login, isAuthenticated, isLoading } = useAuth();
	const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);

	useEffect(() => {
		if (isAuthenticated && !isLoading && !showWelcomeAnimation) {
			router.push("/home");
		}
	}, [isAuthenticated, isLoading, router, showWelcomeAnimation]);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("El correo electrónico es inválido")
			.required("El correo electrónico es requerido"),
		password: Yup.string()
			.min(6, "La contraseña debe tener al menos 6 caracteres")
			.required("La contraseña es requerida"),
	});

	const initialValues = {
		email: "",
		password: "",
	};

	const handleLogin = async (
		values: typeof initialValues,
		{ setSubmitting }: FormikHelpers<typeof initialValues>
	) => {
		try {
			await login(values);

			showToast({
				message: "¡Bienvenido! Inicio de sesión exitoso",
				type: "success",
				autoClose: 2000,
			});

			setShowWelcomeAnimation(true);
		} catch {
			showToast({
				message:
					"Credenciales incorrectas. Por favor, inténtalo de nuevo.",
				type: "error",
				autoClose: 4000,
			});
			setSubmitting(false);
		}
	};

	const handleAnimationComplete = () => {
		setShowWelcomeAnimation(false);
		router.push("/home");
	};

	return (
		<>
			{showWelcomeAnimation && (
				<WelcomeAnimation onComplete={handleAnimationComplete} />
			)}
			<div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
				<div className="p-8 w-full max-w-md shadow-xl glass-effect md:mr-8">
					<h1 className="mb-6 text-3xl font-bold text-center text-white">
						<GradientText>Iniciar Sesión</GradientText>
					</h1>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleLogin}
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
										const firstError =
											Object.values(errors)[0];
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

								<div>
									<button
										type="submit"
										className="px-4 py-2 w-full font-medium rounded-md login-button"
										disabled={isSubmitting}
									>
										{isSubmitting
											? "Iniciando sesión..."
											: "Iniciar Sesión"}
									</button>
								</div>
							</Form>
						)}
					</Formik>

					<div className="mt-6 text-center">
						<p className="text-white/70">
							¿No tienes una cuenta?{" "}
							<Link
								href="/register"
								className="text-[var(--pastel-purple)] hover:text-[var(--light-purple)]"
							>
								Regístrate
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
		</>
	);
}
