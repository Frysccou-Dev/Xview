"use client";
import React from "react";
import ScheduleInfo from "@/components/contact/ScheduleInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQAccordion from "@/components/contact/FAQAccordion";
import ShippingInfo from "@/components/contact/ShippingInfo";
import faqs from "@/components/contact/FAQs";

export default function ContactContent() {
	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<h1 className="mb-6 text-3xl font-bold text-center text-white">
				<span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Contacto
				</span>
			</h1>

			<div className="w-full max-w-3xl">
				<ScheduleInfo />
				<ContactForm />
				<ContactInfo />
				<FAQAccordion faqs={faqs} />
				<ShippingInfo />
			</div>
		</div>
	);
}
