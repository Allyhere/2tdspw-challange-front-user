import type { ZodType } from "zod";
import { ApiError } from "@/lib/api/api.types";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

const DEFAULT_API_URL = "https://veti-api-nyhmyyhlqmwgk.azurewebsites.net";

let refreshedUid: string | null = null;

export async function apiGet<T>(path: string, schema: ZodType<T>): Promise<T> {
  const response = await fetch(apiUrl(path), { headers: await authHeaders() });
  if (!response.ok) throw new ApiError(response.status);
  return schema.parse(await response.json());
}

export async function apiSend(
  path: string,
  method: "PUT" | "PATCH" | "DELETE",
  body: unknown,
): Promise<Response> {
  const headers = new Headers(await authHeaders());
  headers.set("Content-Type", "application/json");
  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new ApiError(response.status);
  return response;
}

export async function apiSendJson<T>(
  path: string,
  method: "PUT" | "PATCH" | "DELETE",
  body: unknown,
  schema: ZodType<T>,
): Promise<T> {
  const response = await apiSend(path, method, body);
  return schema.parse(await response.json());
}

function apiUrl(path: string): string {
  const configured = import.meta.env.VITE_API_URL ?? DEFAULT_API_URL;
  return `${configured.replace(/\/$/, "")}${path}`;
}

async function authHeaders(): Promise<HeadersInit> {
  const token = await readIdToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function readIdToken(): Promise<string | null> {
  if (!isFirebaseConfigured()) return null;
  const user = getFirebaseAuth().currentUser;
  if (!user) return null;
  const forceRefresh = refreshedUid !== user.uid;
  const token = await user.getIdToken(forceRefresh);
  refreshedUid = user.uid;
  return token;
}
