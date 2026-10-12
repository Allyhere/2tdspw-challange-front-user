import type { AuthUser } from "@/auth/session/session.types";

export type TutorSummaryProps = {
  tutor: Pick<AuthUser, "name" | "email" | "phoneNumber" | "document">;
};
