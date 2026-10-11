import { useMemo, useState } from "react";
import type { AuthProviderProps } from "@/auth/AuthProvider/AuthProvider.types";
import { clearSession, readSession, writeSession } from "@/auth/session/session";
import type { AuthUser } from "@/auth/session/session.types";
import { AuthContext } from "@/auth/useAuth/useAuth.constants";
import type { AuthContextValue } from "@/auth/useAuth/useAuth.types";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(readSession);
  const value = useMemo(() => createAuthValue(user, setUser), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function createAuthValue(
  user: AuthUser | null,
  setUser: (user: AuthUser | null) => void,
): AuthContextValue {
  return {
    user,
    signIn: (next) => {
      writeSession(next);
      setUser(next);
    },
    signOut: () => {
      clearSession();
      setUser(null);
    },
  };
}
