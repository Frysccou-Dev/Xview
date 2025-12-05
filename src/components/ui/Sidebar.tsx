import React from "react";
import { useRouter } from "next/navigation";
import { SidebarProps } from "@/types";

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
	const router = useRouter();

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);

		if (tab === "profile") {
			router.push("/dashboard");
		} else if (tab === "orders") {
			router.push("/dashboard/orders");
		}
	};

	return (
		<div className="flex justify-center mb-8 w-full max-w-md">
			<div className="flex w-full rounded-lg overflow-hidden border border-white/20">
				<button
					onClick={() => handleTabChange("profile")}
					className={`flex-1 py-3 px-4 text-center transition-colors ${
						activeTab === "profile"
							? "bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] text-white"
							: "bg-white/5 text-white/70 hover:bg-white/10"
					}`}
				>
					Perfil
				</button>
				<button
					onClick={() => handleTabChange("orders")}
					className={`flex-1 py-3 px-4 text-center transition-colors ${
						activeTab === "orders"
							? "bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] text-white"
							: "bg-white/5 text-white/70 hover:bg-white/10"
					}`}
				>
					Órdenes
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
