'use client'

import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

export const useSession = () => {
	return useContext(AuthContext);
};