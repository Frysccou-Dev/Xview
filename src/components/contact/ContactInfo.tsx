import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import SocialLinks from "./SocialLinks";

const ContactInfo = () => {
	return (
		<div className="p-6 mb-8 glass-effect">
			<h2 className="mb-4 text-2xl font-semibold text-center text-white">
				Información de contacto
			</h2>

			<div className="space-y-4">
				<div className="flex items-center">
					<Mail
						size={20}
						className="mr-3 text-[var(--pastel-purple)]"
					/>
					<p className="text-white">info@xviewmanga.com</p>
				</div>

				<div className="flex items-center">
					<Phone
						size={20}
						className="mr-3 text-[var(--pastel-purple)]"
					/>
					<p className="text-white">+54 9 11 6767-2197</p>
				</div>

				<div className="flex items-center">
					<MapPin
						size={20}
						className="mr-3 text-[var(--pastel-purple)]"
					/>
					<p className="text-white">Calle Hello World 123</p>
				</div>
			</div>

			<SocialLinks />
		</div>
	);
};

export default ContactInfo;
