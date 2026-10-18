import type { ClinicMessage } from "@/data/clinicChat/clinicChat.types";

export type PublicRole = "assistant" | "user" | "vet";

export type PublicMessage = {
  id: string;
  role: PublicRole;
  text: string;
  createdAt: string;
};

export type ConversationPet = {
  id: string;
  name: string;
  breed: string;
  weight: number;
  age: number;
};

export type ConversationSummary = {
  id: string;
  pet: ConversationPet;
  planItemName: string;
  lastMessage: ClinicMessage | null;
};

export type InboxPage = {
  items: ConversationSummary[];
  nextCursor: string | null;
};

export type ConversationThread = {
  id: string;
  agentEnabled: boolean;
  messages: ClinicMessage[];
};

export type OutgoingDraft = {
  key: string;
  text: string;
  sentAt: string;
  failed: boolean;
  retryAt: number;
};
