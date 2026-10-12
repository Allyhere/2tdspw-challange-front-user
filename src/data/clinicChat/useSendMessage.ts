import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/auth/useAuth/useAuth";
import { sendTutorMessage } from "@/data/clinicChat/conversation";
import type { OutgoingDraft } from "@/data/clinicChat/conversation.types";
import { ApiError } from "@/lib/api/api.types";
import { queryClient } from "@/lib/queryClient";
import { wait } from "@/utils/wait";

export function useSendMessage(uid: string | undefined, conversationId: string | undefined) {
  const { signOut } = useAuth();
  const [draft, setDraft] = useState<OutgoingDraft | null>(null);
  const mutation = useMutation({
    mutationFn: (input: OutgoingDraft) =>
      sendTutorMessage(requiredConversationId(conversationId), input.text, input.key),
    onSuccess: () => refreshThread(uid, conversationId, setDraft),
    onError: (error, input) => {
      void settleSendError(error, input, setDraft, signOut, uid, conversationId);
    },
  });

  return {
    draft,
    isSending: mutation.isPending,
    send: (text: string) => startSend(text, setDraft, mutation.mutate),
    retry: () => retrySend(draft, setDraft, mutation.mutate),
  };
}

function startSend(
  text: string,
  setDraft: (draft: OutgoingDraft) => void,
  mutate: (draft: OutgoingDraft) => void,
): void {
  const draft = {
    key: crypto.randomUUID(),
    text,
    sentAt: new Date().toISOString(),
    failed: false,
    retryAt: 0,
  };
  setDraft(draft);
  mutate(draft);
}

function retrySend(
  draft: OutgoingDraft | null,
  setDraft: (draft: OutgoingDraft) => void,
  mutate: (draft: OutgoingDraft) => void,
): void {
  if (!draft) return;
  const next = { ...draft, failed: false };
  setDraft(next);
  const delay = Math.max(0, draft.retryAt - Date.now());
  setTimeout(() => mutate(next), delay);
}

function refreshThread(
  uid: string | undefined,
  conversationId: string | undefined,
  setDraft: (draft: OutgoingDraft | null) => void,
): void {
  void queryClient.invalidateQueries({ queryKey: ["conversation", uid, conversationId] });
  void queryClient.invalidateQueries({ queryKey: ["conversations", uid] });
  setDraft(null);
}

async function settleSendError(
  error: Error,
  input: OutgoingDraft,
  setDraft: (draft: OutgoingDraft | null) => void,
  signOut: () => void,
  uid: string | undefined,
  conversationId: string | undefined,
): Promise<void> {
  if (!(error instanceof ApiError)) {
    setDraft({ ...input, failed: true });
    return;
  }
  if (error.status === 401) {
    signOut();
    return;
  }
  if (error.status === 409) {
    await wait(1500);
    await queryClient.invalidateQueries({ queryKey: ["conversation", uid, conversationId] });
    setDraft(null);
    return;
  }
  const seconds = error.status === 429 ? (error.retryAfterSeconds ?? 1) : 0;
  setDraft({ ...input, failed: true, retryAt: Date.now() + seconds * 1000 });
}

function requiredConversationId(conversationId: string | undefined): string {
  if (!conversationId) throw new Error("Missing conversation id");
  return conversationId;
}
