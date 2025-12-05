import React from "react";
import Image from "next/image";
import GradientText from "@/components/ui/GradientText";

const AboutUsSection = () => {
	return (
		<section className="mb-16 w-full max-w-6xl">
			<h2 className="mb-8 text-4xl font-bold text-center text-white md:text-5xl">
				<GradientText>Nuestra Historia</GradientText>
			</h2>
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="p-6 w-full md:w-1/2 glass-effect">
					<div className="relative w-full h-[300px] overflow-hidden rounded-lg">
						<Image
							src="https://i.pinimg.com/736x/a7/ac/86/a7ac86ddd967710ec30277d4e67cea73.jpg"
							alt="Imagen de nuestra historia"
							fill
							style={{ objectFit: "cover" }}
							className="transition-transform duration-300 hover:scale-105"
							unoptimized
						/>
					</div>
				</div>

				<div className="p-6 w-full md:w-1/2 glass-effect">
					<h3 className="mb-4 text-2xl font-semibold text-white">
						<GradientText>Quiénes Somos</GradientText>
					</h3>
					<p className="mb-4 text-white/80">
						XView nació de la pasión por el manga y la tecnología.
						Desde 2025, nos hemos dedicado a ofrecer una experiencia
						única de lectura digital para los fans del manga en todo
						el mundo hispanohablante.
					</p>
					<p className="mb-4 text-white/80">
						Nuestra misión es clara: facilitar el acceso a mangas de
						forma digital, con una plataforma intuitiva y una
						selección de títulos que combinan grandes éxitos con
						obras menos conocidas que merecen ser leídas.
					</p>
					<p className="text-white/80">
						Con un equipo apasionado por el manga y lo digital,
						trabajamos para que cada lectura sea cómoda, accesible y
						de alta calidad, brindando contenido en formato digital
						adaptado a cualquier dispositivo.
					</p>
				</div>
			</div>
		</section>
	);
};

export default AboutUsSection;
