import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import useFAQ from "@/hooks/contact/useFAQ";
import { FAQAccordionProps } from "@/types";

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
	const { openFaq, toggleFaq } = useFAQ();

	return (
		<div className="p-6 mb-8 glass-effect">
			<h2 className="mb-6 text-2xl font-semibold text-center text-white">
				Preguntas frecuentes
			</h2>

			<div className="space-y-4">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className="overflow-hidden rounded-lg border border-white/10"
					>
						<button
							className="flex justify-between items-center px-4 py-3 w-full text-left text-white bg-white/5 hover:bg-white/10"
							onClick={() => toggleFaq(index)}
						>
							<span className="font-medium">{faq.question}</span>
							{openFaq === index ? (
								<ChevronUp
									size={20}
									className="text-[var(--pastel-purple)]"
								/>
							) : (
								<ChevronDown
									size={20}
									className="text-[var(--pastel-purple)]"
								/>
							)}
						</button>

						{openFaq === index && (
							<div className="px-4 py-3 text-white/80 bg-white/5">
								<p>{faq.answer}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQAccordion;
