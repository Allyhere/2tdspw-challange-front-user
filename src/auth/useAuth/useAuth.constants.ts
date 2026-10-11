import { createContext } from "react";
import type { AuthContextValue } from "@/auth/useAuth/useAuth.types";

export const AuthContext = createContext<AuthContextValue | null>(null);
