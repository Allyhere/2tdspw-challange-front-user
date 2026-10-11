import { nationalMobile, otpCode } from "@/lib/phone/phone.constants";

export function normalizePhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const national =
    digits.length === 13 && digits.startsWith("55") ? digits.slice(2) : digits;
  const parsed = nationalMobile.safeParse(national);
  return parsed.success ? `+55${parsed.data}` : null;
}

export function parseOtp(value: string): string | null {
  const parsed = otpCode.safeParse(value.trim());
  return parsed.success ? parsed.data : null;
}

export function formatPhone(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, "");
  const country = digits.slice(0, 2);
  const area = digits.slice(2, 4);
  const prefix = digits.slice(4, 9);
  const line = digits.slice(9);
  return `+${country} ${area} ${prefix}-${line}`;
}
