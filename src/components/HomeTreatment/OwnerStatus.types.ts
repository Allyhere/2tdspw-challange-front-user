import type { AuthUser } from "@/auth/session/session.types";

export type OwnerStatusProps = {
  tutor: AuthUser | null;
  message: string;
};
