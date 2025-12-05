"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WelcomeAnimationProps } from "@/types";


const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
	const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const messages = [
		"Bienvenido/a",
		"Disfruta de nuestro catalogo exclusivo de mangas!",
		":D",
	];

	const handleScreenClick = () => {
		if (currentMessageIndex < messages.length - 1) {
			setCurrentMessageIndex((prevIndex) => prevIndex + 1);
		} else {
			setIsVisible(false);
			setTimeout(() => {
				onComplete();
			}, 500);
		}
	};

	useEffect(() => {
		const handleKeyPress = () => {
			handleScreenClick();
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [currentMessageIndex]);

	if (!isVisible) return null;

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex items-center justify-center glass-effect-for-welcome"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={handleScreenClick}
			style={{
				width: "100vw",
				height: "100vh",
				position: "fixed",
				top: 0,
				left: 0,
			}}
		>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentMessageIndex}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
					className="text-center p-8 md:p-12 w-[90%] max-w-2xl"
				>
					<h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] pb-2">
						{messages[currentMessageIndex]}
					</h2>
					<p className="mt-4 text-white/70 text-sm md:text-base">
						{currentMessageIndex < messages.length - 1
							? "Haz clic para continuar"
							: "Haz clic para comenzar"}
					</p>
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
};

export default WelcomeAnimation;
