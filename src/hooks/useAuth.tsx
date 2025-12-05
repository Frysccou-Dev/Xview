"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/types";

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("Mal uso de useAuth");
	}

	return context;
};

export default useAuth;
