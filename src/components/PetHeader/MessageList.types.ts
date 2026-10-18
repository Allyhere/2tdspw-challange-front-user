import type { ClinicMessage } from "@/data/clinicChat/clinicChat.types";

export type MessageListProps = {
  messages: ClinicMessage[];
  onRetry: (id: string) => void;
};

export type MessageBubbleProps = {
  message: ClinicMessage;
  onRetry: (id: string) => void;
};
