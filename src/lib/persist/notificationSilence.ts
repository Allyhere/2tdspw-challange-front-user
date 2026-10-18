import { del, get, set } from "idb-keyval";
import {
  activeSilence,
  isSilenceChoice,
  type SilenceChoice,
  type StoredSilence,
} from "@/utils/silenceChoice";

const silenceKey = "notification-silence";

export async function readNotificationSilence(): Promise<{
  choice: SilenceChoice;
  until: string | null;
}> {
  const stored = parseSilence(await get(silenceKey));
  const active = activeSilence(stored);
  if (stored && active.choice === "never") await del(silenceKey);
  return active;
}

export async function writeNotificationSilence(stored: StoredSilence | null): Promise<void> {
  if (!stored) {
    await del(silenceKey);
    return;
  }
  await set(silenceKey, stored);
}

export async function clearNotificationSilence(): Promise<void> {
  await del(silenceKey);
}

function parseSilence(value: unknown): StoredSilence | null {
  if (typeof value !== "object" || value === null) return null;
  if (!("choice" in value) || !("until" in value)) return null;
  const { choice, until } = value;
  if (typeof choice !== "string" || typeof until !== "string") return null;
  if (!isSilenceChoice(choice) || choice === "never") return null;
  return { choice, until };
}
