import { RecaptchaVerifier, type Auth } from "firebase/auth";

type RecaptchaClient = {
  reset: (widgetId: number) => void;
};

export function createPhoneVerifier(
  auth: Auth,
  button: HTMLElement,
  onSolved: () => void,
): RecaptchaVerifier {
  return new RecaptchaVerifier(auth, button, {
    size: "invisible",
    callback: (token: string) => {
      if (!token) return;
      onSolved();
    },
  });
}

export async function resetPhoneVerifier(
  verifier: RecaptchaVerifier,
): Promise<void> {
  const widgetId = await verifier.render();
  readRecaptchaClient()?.reset(widgetId);
}

function readRecaptchaClient(): RecaptchaClient | null {
  if (!("grecaptcha" in window)) return null;
  const root: unknown = window.grecaptcha;
  return clientWithReset(root) ?? enterpriseClient(root);
}

function enterpriseClient(value: unknown): RecaptchaClient | null {
  if (!isRecord(value) || !("enterprise" in value)) return null;
  return clientWithReset(value.enterprise);
}

function clientWithReset(value: unknown): RecaptchaClient | null {
  if (!isRecaptchaClient(value)) return null;
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isRecaptchaClient(value: unknown): value is RecaptchaClient {
  if (typeof value !== "object" || value === null) return false;
  if (!("reset" in value)) return false;
  return typeof value.reset === "function";
}
