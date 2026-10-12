import {
  signInWithPhoneNumber,
  type ConfirmationResult,
  type RecaptchaVerifier,
} from "firebase/auth";
import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import { readTutorSession } from "@/auth/session/readTutorSession";
import type { AuthUser } from "@/auth/session/session.types";
import { getFirebaseAuth } from "@/lib/firebase";

export async function sendPhoneCode(
  phoneNumber: string,
  verifier: RecaptchaVerifier,
): Promise<PhoneConfirmation> {
  const confirmation = await signInWithPhoneNumber(
    getFirebaseAuth(),
    phoneNumber,
    verifier,
  );
  return {
    confirm: (code) => confirmPhoneCode(confirmation, code),
  };
}

async function confirmPhoneCode(
  confirmation: ConfirmationResult,
  code: string,
): Promise<AuthUser> {
  const credential = await confirmation.confirm(code);
  const session = await readTutorSession(credential.user);
  if (!session) {
    throw new Error("missing-phone");
  }
  return session;
}
