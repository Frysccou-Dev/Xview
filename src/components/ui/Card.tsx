import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardProps } from "@/types";

const Card: FC<CardProps> = ({ id, imageUrl, className = "", title = "" }) => {
	return (
		<Link href={`/products/${id}`} className="block w-full sm:w-auto">
			<div className="relative px-2 mb-6 w-full transition-transform duration-300 transform hover:z-10 sm:mb-0">
				<div
					className={`overflow-hidden relative w-full h-102 shadow-lg sm:w-64 sm:h-112 group card-glass-effect ${className}`}
				>
					<div className="relative w-full h-full">
						<Image
							src={imageUrl || "/manga-placeholder.jpg"}
							alt={title || "Manga Image"}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{
								objectFit: "cover",
								objectPosition: "center",
							}}
							className="transition-transform duration-300 group-hover:scale-105"
							priority
						/>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
