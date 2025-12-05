import React from "react";
import { Clock } from "lucide-react";

const ScheduleInfo = () => {
	return (
		<div className="p-4 mb-8 glass-effect">
			<div className="flex items-center mb-2 text-[var(--pastel-purple)]">
				<Clock size={20} className="mr-2" />
				<p className="font-medium text-white">Horario de atención</p>
			</div>
			<p className="text-white/80">
				Nuestro equipo está disponible para atenderte de{" "}
				<span className="font-semibold text-[var(--pastel-salmon)]">
					13:00 a 19:00 hs
				</span>
				.
			</p>
		</div>
	);
};

export default ScheduleInfo;
