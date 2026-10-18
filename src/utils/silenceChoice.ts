export type SilenceChoice = "day" | "month" | "three-months" | "never";

export type StoredSilence = {
  choice: Exclude<SilenceChoice, "never">;
  until: string;
};

export function isSilenceChoice(value: string): value is SilenceChoice {
  return value === "day" || value === "month" || value === "three-months" || value === "never";
}

export function silenceUntil(choice: Exclude<SilenceChoice, "never">, now = new Date()): string {
  const until = new Date(now);
  if (choice === "day") until.setDate(until.getDate() + 1);
  if (choice === "month") until.setMonth(until.getMonth() + 1);
  if (choice === "three-months") until.setMonth(until.getMonth() + 3);
  return until.toISOString();
}

export function activeSilence(
  stored: StoredSilence | null,
  now = Date.now(),
): { choice: SilenceChoice; until: string | null } {
  if (!stored || Date.parse(stored.until) <= now) return { choice: "never", until: null };
  return stored;
}

export function timedSilence(choice: SilenceChoice, now = new Date()): StoredSilence | null {
  if (choice === "never") return null;
  return { choice, until: silenceUntil(choice, now) };
}
