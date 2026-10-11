import type { AuthUser } from "@/auth/session/session.types";

export type AuthContextValue = {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
};
