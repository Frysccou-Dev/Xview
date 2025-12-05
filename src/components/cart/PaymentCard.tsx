import React, { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { ApiService } from "@/services/api.service";
import { PaymentCardProps } from "@/types";

const PaymentCard: React.FC<PaymentCardProps> = ({
	cardNumber,
	cardHolder,
	expiryDate,
	cvv,
	isFlipped,
}) => {
	const [userName, setUserName] = useState<string>("");

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userData = await ApiService.getCurrentUser();
				if (userData && userData.name) {
					setUserName(userData.name);
				}
			} catch {}
		};

		fetchUserData();
	}, []);

	const formattedCardNumber = cardNumber
		? cardNumber
				.replace(/\s/g, "")
				.replace(/(\d{4})/g, "$1 ")
				.trim()
		: "•••• •••• •••• ••••";

	const formattedCardHolder = cardHolder || userName || "NOMBRE APELLIDO";
	const formattedExpiryDate = expiryDate || "MM/AA";
	const formattedCVV = cvv || "•••";

	return (
		<div className="relative w-full max-w-sm mx-auto mb-8 perspective-1000">
			<div
				className={`relative w-full h-48 sm:h-56 rounded-xl transition-all duration-500 transform-style-preserve-3d shadow-2xl ${
					isFlipped ? "rotate-y-180" : ""
				}`}
			>
				<div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between backface-hidden rounded-xl bg-gradient-to-br from-black via-[#121212] to-[#1e1e1e] border border-[var(--pastel-purple)]/30">
					<div className="absolute inset-0 rounded-xl overflow-hidden">
						<div className="absolute top-0 right-0 w-full h-full opacity-10">
							<div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[var(--pastel-purple)]"></div>
							<div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-[var(--pastel-salmon)]"></div>
						</div>
						<div className="absolute top-0 left-0 w-full h-full">
							<div className="absolute top-6 left-6 right-6 bottom-6 border-2 border-white/5 rounded-lg"></div>
						</div>
					</div>

					<div className="flex justify-between items-start relative">
						<div className="text-base sm:text-xl font-bold tracking-wider bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] bg-clip-text text-transparent flex items-center">
							<CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[var(--pastel-purple)]" />
							Xview Debit Card
						</div>
						<div className="flex space-x-1">
							<div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--pastel-purple)]/80 opacity-70"></div>
							<div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--pastel-salmon)]/80 opacity-70 -ml-3 sm:-ml-4"></div>
						</div>
					</div>

					<div className="mt-2 sm:mt-4 relative">
						<div className="w-12 h-8 sm:w-14 sm:h-10 mb-4 sm:mb-6 rounded bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] opacity-80 flex items-center justify-center">
							<div className="w-8 h-5 sm:w-10 sm:h-6 border border-white/20 rounded-sm"></div>
						</div>
						<div className="text-white text-base sm:text-xl tracking-widest font-mono">
							{formattedCardNumber}
						</div>
					</div>

					<div className="flex justify-between items-center relative">
						<div className="text-white/90">
							<div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/60">
								Titular
							</div>
							<div className="font-medium tracking-wide text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[180px]">
								{formattedCardHolder}
							</div>
						</div>
						<div className="flex flex-col items-end">
							<div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/60">
								Expira
							</div>
							<div className="font-medium text-xs sm:text-sm text-white">
								{formattedExpiryDate}
							</div>
							<div className="absolute -bottom-4 sm:-bottom-6 right-0 text-[6px] sm:text-[8px] text-white/40">
								XVIEW
							</div>
						</div>
					</div>
				</div>

				<div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-gradient-to-br from-black via-[#121212] to-[#1e1e1e] border border-[var(--pastel-purple)]/30">
					<div className="absolute inset-0 rounded-xl overflow-hidden">
						<div className="absolute top-0 right-0 w-full h-full opacity-10">
							<div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-[var(--pastel-salmon)]"></div>
							<div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[var(--pastel-purple)]"></div>
						</div>
					</div>

					<div className="w-full h-10 sm:h-14 bg-[#1a1a1a] mt-4 sm:mt-5 relative">
						<div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[var(--pastel-purple)]/20 via-[var(--pastel-salmon)]/20 to-[var(--pastel-purple)]/20"></div>
					</div>

					<div className="px-4 sm:px-6 mt-4 sm:mt-6">
						<div className="flex flex-col space-y-2">
							<div className="flex items-center justify-between">
								<div className="h-8 sm:h-10 w-3/5 bg-[#1a1a1a] rounded"></div>
								<div className="bg-white/10 h-8 sm:h-10 w-20 sm:w-24 rounded flex items-center justify-center">
									<div className="text-white font-mono text-sm sm:text-base tracking-widest">
										{formattedCVV}
									</div>
								</div>
							</div>

							<div className="mt-2 sm:mt-4 text-[8px] sm:text-[10px] text-white/50 leading-tight">
								<p>
									Este código de seguridad (CVV) protege tu
									tarjeta contra uso no autorizado.
								</p>
								<div className="mt-2 sm:mt-3 flex justify-between items-center">
									<p className="text-[6px] sm:text-[8px] text-white/40 flex items-center">
										<CreditCard className="w-2 h-2 sm:w-3 sm:h-3 mr-1 text-[var(--pastel-salmon)]" />
										XVIEW BANK OF FRONTEND DESIGN
									</p>
									<div className="bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] bg-clip-text text-transparent text-[10px] sm:text-xs font-bold">
										XVIEW
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentCard;
