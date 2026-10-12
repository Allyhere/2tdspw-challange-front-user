import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import type { Query } from "@tanstack/react-query";
import { del, get, set } from "idb-keyval";

export const QUERY_CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const CACHE_KEY = "veti-query-cache";

let acceptWrites = true;

export const queryPersister = createAsyncStoragePersister({
  key: CACHE_KEY,
  storage: {
    getItem: readCacheEntry,
    setItem: writeCacheEntry,
    removeItem: (key) => del(key),
  },
});

export function shouldPersistQuery(query: Query): boolean {
  const name = query.queryKey[0];
  if (name !== "owner-profile" && name !== "treatment-plan") return false;
  return query.state.status === "success";
}

export function sealQueryCache(): void {
  acceptWrites = false;
}

export function unsealQueryCache(): void {
  acceptWrites = true;
}

async function readCacheEntry(key: string): Promise<string | null> {
  const value = await get<string>(key);
  return typeof value === "string" ? value : null;
}

async function writeCacheEntry(key: string, value: string): Promise<void> {
  if (!acceptWrites) return;
  await set(key, value);
  if (!acceptWrites) await del(key);
}
