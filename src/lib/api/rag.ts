import type { ZodType } from "zod";
import { ApiError } from "@/lib/api/api.types";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

const DEFAULT_RAG_URL =
  "https://veti-rag-api.livelystone-4391080e.chilecentral.azurecontainerapps.io";

let refreshedUid: string | null = null;

export function ragGet<T>(path: string, schema: ZodType<T>): Promise<T> {
  return ragRequest("GET", path, undefined, schema);
}

export function ragPost<T>(path: string, body: unknown, schema: ZodType<T>): Promise<T> {
  return ragRequest("POST", path, body, schema);
}

async function ragRequest<T>(
  method: "GET" | "POST",
  path: string,
  body: unknown,
  schema: ZodType<T>,
): Promise<T> {
  const headers = await ragHeaders(body !== undefined);
  const response = await fetch(ragUrl(path), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) throw new ApiError(response.status, retryAfterSeconds(response));
  return schema.parse(await response.json());
}

function ragUrl(path: string): string {
  const configured = import.meta.env.VITE_RAG_API_URL ?? DEFAULT_RAG_URL;
  return `${configured.replace(/\/$/, "")}${path}`;
}

async function ragHeaders(json: boolean): Promise<Headers> {
  const headers = new Headers();
  if (json) headers.set("Content-Type", "application/json");
  const token = await readIdToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
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

function retryAfterSeconds(response: Response): number | null {
  const header = response.headers.get("Retry-After");
  if (!header) return null;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds);
  const date = Date.parse(header);
  if (Number.isNaN(date)) return null;
  return Math.max(0, Math.ceil((date - Date.now()) / 1000));
}
