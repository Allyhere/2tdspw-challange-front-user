import type { ClinicMessage } from "@/data/clinicChat/clinicChat.types";
import type { OutgoingDraft } from "@/data/clinicChat/conversation.types";

export function withPendingMessage(
  messages: ClinicMessage[],
  draft: OutgoingDraft | null,
): ClinicMessage[] {
  if (!draft) return messages;
  const echoed = messages.some(
    (message) =>
      message.id !== draft.key &&
      message.author === "tutor" &&
      message.body === draft.text &&
      Date.parse(message.sentAt) >= Date.parse(draft.sentAt) - 2000,
  );
  if (echoed && !draft.failed) return messages;
  return [
    ...messages,
    {
      id: draft.key,
      author: "tutor",
      body: draft.text,
      sentAt: draft.sentAt,
      pending: !draft.failed,
      failed: draft.failed,
    },
  ];
}
