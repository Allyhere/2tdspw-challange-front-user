import { registerSW } from "virtual:pwa-register";
import { A11Y_QUERY } from "@/auth/session/session.constants";

export function registerProductionServiceWorker(): void {
  if (!import.meta.env.PROD) return;
  if (new URLSearchParams(window.location.search).get(A11Y_QUERY) === "1") return;
  if (navigator.webdriver) return;
  registerSW({ immediate: true });
}
