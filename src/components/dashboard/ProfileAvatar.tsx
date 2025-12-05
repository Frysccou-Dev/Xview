import React from "react";
import Image from "next/image";
import { ProfileAvatarProps } from "@/types";

const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
	return (
		<div className="flex justify-center mb-8">
			<div className="p-1 rounded-full bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
				<div
					className="flex justify-center items-center w-32 h-32 text-5xl font-bold rounded-full bg-cover bg-center"
					style={{ backgroundImage: `url('/mesh-gradient.png')` }}
				>
					<span className="text-white">
						{user.name ? user.name.charAt(0).toUpperCase() : "U"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProfileAvatar;
