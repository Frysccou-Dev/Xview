"use client";

import React from "react";
import HomeHero from "@/components/ui/Home-hero";
import FeaturedMangasSection from "@/components/home/FeaturedMangasSection";
import AboutUsSection from "@/components/home/AboutUsSection";
import useFeaturedProducts from "@/hooks/home/useFeaturedProducts";

export default function HomeContent() {
	const { featuredMangas, loading } = useFeaturedProducts(7);

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<div className="w-full">
				<HomeHero />
			</div>

			<FeaturedMangasSection mangas={featuredMangas} loading={loading} />

			<AboutUsSection />
		</div>
	);
}
