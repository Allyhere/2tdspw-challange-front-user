import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";

export function ChatPushRefresh() {
  useEffect(() => listenForChatPush(), []);
  return null;
}

function listenForChatPush(): () => void {
  if (!("serviceWorker" in navigator)) return () => undefined;
  const onMessage = (event: MessageEvent<unknown>) => {
    if (!isChatPush(event.data)) return;
    void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    void queryClient.invalidateQueries({ queryKey: ["conversation"] });
  };
  navigator.serviceWorker.addEventListener("message", onMessage);
  return () => navigator.serviceWorker.removeEventListener("message", onMessage);
}

function isChatPush(data: unknown): data is { type: "chat-push" } {
  return typeof data === "object" && data !== null && "type" in data && data.type === "chat-push";
}
