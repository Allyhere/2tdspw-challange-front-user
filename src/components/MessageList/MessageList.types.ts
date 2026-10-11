import type { ClinicMessage } from "@/data/clinicChat/clinicChat.types";

export type MessageListProps = {
  messages: ClinicMessage[];
};

export type MessageBubbleProps = {
  message: ClinicMessage;
};
