import ActButtons from "@/components/landing/ActButtons";
import { GradientText } from "@/components/ui";

export default function LandingContent() {
	return (
		<main className="flex flex-col justify-center items-center px-4 min-h-screen sm:px-6 lg:px-8 py-16">
			<div className="relative z-10 text-center">
				<h1 className="mb-8 text-6xl font-bold sm:text-7xl md:text-8xl inline-block relative">
					<GradientText>XView Manga</GradientText>
				</h1>

				<p className="text-[var(--light-gray)] text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto mb-12 italic">
					Descubre un mundo de historias ilustradas. Tu destino
					definitivo para los mejores mangas en español.
				</p>

				<ActButtons />
			</div>
		</main>
	);
}
