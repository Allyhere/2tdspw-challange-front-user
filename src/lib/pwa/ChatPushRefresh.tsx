import { useEffect } from "react";
import { clearPlanBust, readPlanBust } from "@/lib/persist/planBust";
import { queryClient } from "@/lib/queryClient";

export function ChatPushRefresh() {
  useEffect(() => {
    void consumePlanBust();
    return listenForChatPush();
  }, []);
  return null;
}

function listenForChatPush(): () => void {
  if (!("serviceWorker" in navigator)) return () => undefined;
  const onMessage = (event: MessageEvent<unknown>) => {
    if (!isChatPush(event.data)) return;
    void refreshAfterPush();
  };
  navigator.serviceWorker.addEventListener("message", onMessage);
  return () => navigator.serviceWorker.removeEventListener("message", onMessage);
}

function isChatPush(data: unknown): data is { type: "chat-push" } {
  return typeof data === "object" && data !== null && "type" in data && data.type === "chat-push";
}

async function consumePlanBust(): Promise<void> {
  const bust = await readPlanBust();
  if (typeof bust !== "number") return;
  await refreshAfterPush();
}

async function refreshAfterPush(): Promise<void> {
  await clearPlanBust();
  await queryClient.invalidateQueries({ queryKey: ["conversations"] });
  await queryClient.invalidateQueries({ queryKey: ["conversation"] });
  await queryClient.invalidateQueries({ queryKey: ["treatment-plan"] });
}
