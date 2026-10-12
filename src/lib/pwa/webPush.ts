import { apiSend } from "@/lib/api/api";
import { ApiError } from "@/lib/api/api.types";
import { vapidKeyBytes } from "@/utils/vapidKey";

const endpointKey = "veti-web-push-endpoint";

export async function enableWebPush(): Promise<boolean> {
  if (!("Notification" in window)) return false;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return false;
  if (import.meta.env.PROD) await subscribeInstalledWorker();
  return true;
}

export async function removeWebPushSubscription(): Promise<void> {
  const endpoint = localStorage.getItem(endpointKey);
  if (!endpoint) return;
  try {
    await apiSend("/notifications/web-push", "DELETE", { endpoint });
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 404) return;
  }
  localStorage.removeItem(endpointKey);
}

async function subscribeInstalledWorker(): Promise<void> {
  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  if (!publicKey || !("serviceWorker" in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidKeyBytes(publicKey),
  });
  const json = subscription.toJSON();
  const endpoint = json.endpoint;
  const p256dh = json.keys?.p256dh;
  const auth = json.keys?.auth;
  if (!endpoint || !p256dh || !auth) return;
  await apiSend("/notifications/web-push", "PUT", {
    endpoint,
    keys: { p256dh, auth },
  });
  localStorage.setItem(endpointKey, endpoint);
}
