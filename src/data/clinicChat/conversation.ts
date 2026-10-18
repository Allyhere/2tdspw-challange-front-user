import type { InfiniteData } from "@tanstack/react-query";
import { z } from "zod";
import type { ClinicMessage } from "@/data/clinicChat/clinicChat.types";
import type {
  ConversationSummary,
  ConversationThread,
  InboxPage,
  PublicMessage,
} from "@/data/clinicChat/conversation.types";
import { ragGet, ragPost } from "@/lib/api/rag";

const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["assistant", "user", "vet"]),
  text: z.string(),
  createdAt: z.string(),
});

const summarySchema = z.object({
  id: z.string(),
  pet: z.object({
    id: z.string(),
    name: z.string(),
    breed: z.string(),
    weight: z.number(),
    age: z.number(),
  }),
  planStep: z.object({ planItemName: z.string() }),
  lastMessage: messageSchema.nullable(),
});

const listSchema = z.object({
  items: z.array(summarySchema),
  nextCursor: z.string().nullable(),
});

const threadSchema = z.object({
  id: z.string(),
  agentEnabled: z.boolean(),
  messages: z.array(messageSchema),
});

const sendSchema = z.object({
  id: z.string(),
  status: z.enum(["invited", "accepted", "declined"]),
  message: messageSchema,
});

export function toClinicMessage(message: PublicMessage): ClinicMessage {
  return {
    id: message.id,
    author: message.role === "user" ? "tutor" : "clinic",
    body: message.text,
    sentAt: message.createdAt,
  };
}

export function fetchInbox(cursor?: string): Promise<InboxPage> {
  const params = new URLSearchParams({ limit: "20" });
  if (cursor) params.set("cursor", cursor);
  return ragGet(`/v1/conversations?${params.toString()}`, listSchema).then(toInboxPage);
}

export function fetchConversation(conversationId: string): Promise<ConversationThread> {
  return ragGet(`/v1/conversations/${encodeURIComponent(conversationId)}`, threadSchema).then(
    (thread) => ({
      id: thread.id,
      agentEnabled: thread.agentEnabled,
      messages: thread.messages.map(toClinicMessage),
    }),
  );
}

export function sendTutorMessage(
  conversationId: string,
  text: string,
  idempotencyKey: string,
): Promise<PublicMessage> {
  const path = `/v1/conversations/${encodeURIComponent(conversationId)}/messages`;
  return ragPost(path, { text, idempotencyKey }, sendSchema).then((result) => result.message);
}

function toInboxPage(page: z.infer<typeof listSchema>): InboxPage {
  return {
    nextCursor: page.nextCursor,
    items: page.items.map(toSummary),
  };
}

export function inboxItems(data: InfiniteData<InboxPage> | undefined): ConversationSummary[] {
  return data?.pages.flatMap((page) => page.items) ?? [];
}

function toSummary(item: z.infer<typeof summarySchema>): ConversationSummary {
  return {
    id: item.id,
    pet: item.pet,
    planItemName: item.planStep.planItemName,
    lastMessage: item.lastMessage ? toClinicMessage(item.lastMessage) : null,
  };
}
