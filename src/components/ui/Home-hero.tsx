"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HomeHero() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const titleX = canvas.width / 2;
		const titleY = canvas.height / 2 - 20;
		const titleRadius = Math.min(canvas.width, canvas.height) * 0.45;

		const gradient = ctx.createRadialGradient(
			titleX,
			titleY,
			0,
			titleX,
			titleY,
			titleRadius
		);

		gradient.addColorStop(0, "rgba(200, 182, 255, 0.9)");
		gradient.addColorStop(0.5, "rgba(255, 182, 185, 0.4)");
		gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const handleResize = () => {
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			if (ctx) {
				const titleX = canvas.width / 2;
				const titleY = canvas.height / 2 - 20;
				const titleRadius =
					Math.min(canvas.width, canvas.height) * 0.45;

				const gradient = ctx.createRadialGradient(
					titleX,
					titleY,
					0,
					titleX,
					titleY,
					titleRadius
				);

				gradient.addColorStop(0, "rgba(200, 182, 255, 0.9)");
				gradient.addColorStop(0.5, "rgba(255, 182, 185, 0.4)");
				gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center overflow-hidden">
			<canvas
				ref={canvasRef}
				className="absolute top-0 left-0 w-full h-full"
			/>

			<div className="flex relative z-10 flex-col justify-center items-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2 }}
					className="relative"
				>
					<div className="text-[80px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[var(--white)] to-[var(--pastel-purple)]">
						XView .
					</div>

					<motion.div
						className="absolute -top-10 -right-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--pastel-purple)]/15 backdrop-blur-sm"
						animate={{
							y: [0, -15, 0],
							x: [0, 10, 0],
						}}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							duration: 5,
							ease: "easeInOut",
						}}
					/>

					<motion.div
						className="absolute -bottom-5 -left-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--pastel-salmon)]/20 backdrop-blur-sm"
						animate={{
							y: [0, 10, 0],
							x: [0, -5, 0],
						}}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							duration: 4,
							ease: "easeInOut",
							delay: 0.5,
						}}
					/>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 1 }}
					className="mt-8 text-lg sm:text-xl md:text-2xl text-[var(--light-purple)]/70 font-light tracking-wide text-center max-w-md px-4"
				>
					Descubre un universo de historias ilustradas al alcance de
					tus manos.
				</motion.p>
			</div>
		</div>
	);
}