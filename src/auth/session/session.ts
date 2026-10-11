import { A11Y_QUERY, SESSION_KEY } from "@/auth/session/session.constants";
import type { AuthUser } from "@/auth/session/session.types";

export function readSession(): AuthUser | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return parseSession(raw);
}

export function writeSession(user: AuthUser) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isA11yPreview(search: string): boolean {
  return new URLSearchParams(search).get(A11Y_QUERY) === "1";
}

function parseSession(raw: string): AuthUser | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    return isAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== "object" || value === null) return false;
  if (!("phoneNumber" in value)) return false;
  return typeof value.phoneNumber === "string";
}
