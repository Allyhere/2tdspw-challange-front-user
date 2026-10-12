import type { ConversationSummary } from "@/data/clinicChat/conversation.types";

export type ChatPreviewProps = {
  items: ConversationSummary[];
  isLoading: boolean;
  isError: boolean;
  isOffline: boolean;
  hasNextPage: boolean;
  onRetry: () => void;
  onNextPage: () => void;
};

export type ConversationLinkProps = {
  item: ConversationSummary;
};
