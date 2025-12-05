import React from "react";
import { showToast } from "@/components/ui/Toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			email: Yup.string().email("Email inválido").required("El email es obligatorio"),
			subject: Yup.string().required("El asunto es obligatorio"),
			message: Yup.string().required("El mensaje es obligatorio"),
		}),
		onSubmit: async (values, { resetForm }) => {
			console.log("Formulario enviado:", values);
			showToast({
				message: "Mensaje enviado correctamente",
				type: "success",
			});
			resetForm();
		},
	});

	return (
		<div className="p-6 mb-8 glass-effect">
			<h2 className="mb-6 text-2xl font-semibold text-center text-white">
				Formulario de contacto
			</h2>
			<form className="space-y-4" onSubmit={formik.handleSubmit}>
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-white"
					>
						Nombre
					</label>
					<input
						id="name"
						type="text"
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="Tu nombre"
						{...formik.getFieldProps("name")}
					/>
					{formik.touched.name && formik.errors.name ? (
						<div className="mt-1 text-red-500 text-sm">{formik.errors.name}</div>
					) : null}
				</div>

				<div>
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-white"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="tu@email.com"
						{...formik.getFieldProps("email")}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="mt-1 text-red-500 text-sm">{formik.errors.email}</div>
					) : null}
				</div>

				<div>
					<label
						htmlFor="subject"
						className="block mb-2 text-sm font-medium text-white"
					>
						Asunto
					</label>
					<input
						id="subject"
						type="text"
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="Asunto de tu mensaje"
						{...formik.getFieldProps("subject")}
					/>
					{formik.touched.subject && formik.errors.subject ? (
						<div className="mt-1 text-red-500 text-sm">{formik.errors.subject}</div>
					) : null}
				</div>

				<div>
					<label
						htmlFor="message"
						className="block mb-2 text-sm font-medium text-white"
					>
						Mensaje
					</label>
					<textarea
						id="message"
						rows={4}
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="Escribe tu mensaje aquí..."
						{...formik.getFieldProps("message")}
					/>
					{formik.touched.message && formik.errors.message ? (
						<div className="mt-1 text-red-500 text-sm">{formik.errors.message}</div>
					) : null}
				</div>

				<div>
					<button
						type="submit"
						className="px-4 py-2 w-full font-medium rounded-md login-button"
						disabled={formik.isSubmitting}
					>
						{formik.isSubmitting ? "Enviando..." : "Enviar mensaje"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
