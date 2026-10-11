import type { AuthUser } from "@/auth/session/session.types";

export type PhoneConfirmation = {
  confirm: (code: string) => Promise<AuthUser>;
};
