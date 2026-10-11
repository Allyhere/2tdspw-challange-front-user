import { z } from "zod";
import {
  PHONE_AUTH_ERROR_FALLBACK,
  PHONE_AUTH_ERROR_MESSAGES,
} from "@/auth/phoneAuth/phoneAuth.constants";

const authErrorSchema = z.object({
  code: z.string(),
});

export function phoneAuthErrorMessage(error: unknown): string {
  const parsed = authErrorSchema.safeParse(error);
  if (!parsed.success) return PHONE_AUTH_ERROR_FALLBACK;
  return PHONE_AUTH_ERROR_MESSAGES[parsed.data.code] ?? PHONE_AUTH_ERROR_FALLBACK;
}
