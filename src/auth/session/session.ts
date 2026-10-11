import { A11Y_QUERY } from "@/auth/session/session.constants";

export function isA11yPreview(search: string): boolean {
  return new URLSearchParams(search).get(A11Y_QUERY) === "1";
}
