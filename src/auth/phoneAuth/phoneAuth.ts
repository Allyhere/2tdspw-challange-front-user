import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import { writeSession } from "@/auth/session/session";
import type { AuthUser } from "@/auth/session/session.types";

// Local stand-in for Firebase phone auth. Swap this module for firebase/auth later.
export async function sendPhoneCode(
  phoneNumber: string,
): Promise<PhoneConfirmation> {
  return {
    confirm: (code) => confirmPhoneCode(phoneNumber, code),
  };
}

export async function confirmPhoneCode(
  phoneNumber: string,
  code: string,
): Promise<AuthUser> {
  if (!/^\d{6}$/.test(code)) {
    throw new Error("invalid-code");
  }
  const user = { phoneNumber };
  writeSession(user);
  return user;
}
