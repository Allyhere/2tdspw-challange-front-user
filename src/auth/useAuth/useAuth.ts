import { useContext } from "react";
import { AuthContext } from "@/auth/useAuth/useAuth.constants";
import type { AuthContextValue } from "@/auth/useAuth/useAuth.types";

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
