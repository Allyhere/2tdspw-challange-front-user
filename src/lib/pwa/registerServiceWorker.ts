import { registerSW } from "virtual:pwa-register";
import { isA11yPreview } from "@/auth/session/session";

export function registerProductionServiceWorker(): void {
  if (!import.meta.env.PROD) return;
  if (isA11yPreview(window.location.search)) return;
  if (navigator.webdriver) return;
  registerSW({ immediate: true });
}
