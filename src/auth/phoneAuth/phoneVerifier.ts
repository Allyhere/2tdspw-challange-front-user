import { RecaptchaVerifier, type Auth } from "firebase/auth";

type RecaptchaClient = {
  reset: (widgetId: number) => void;
};

export function createPhoneVerifier(
  auth: Auth,
  button: HTMLElement,
): RecaptchaVerifier {
  return new RecaptchaVerifier(auth, button, { size: "invisible" });
}

export async function resetPhoneVerifier(
  verifier: RecaptchaVerifier,
): Promise<void> {
  const widgetId = await verifier.render();
  readRecaptchaClient()?.reset(widgetId);
}

function readRecaptchaClient(): RecaptchaClient | null {
  if (!("grecaptcha" in window)) return null;
  const client: unknown = window.grecaptcha;
  if (!isRecaptchaClient(client)) return null;
  return client;
}

function isRecaptchaClient(value: unknown): value is RecaptchaClient {
  if (typeof value !== "object" || value === null) return false;
  if (!("reset" in value)) return false;
  return typeof value.reset === "function";
}
