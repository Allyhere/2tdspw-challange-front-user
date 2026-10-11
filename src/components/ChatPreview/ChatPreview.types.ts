import type { ClinicMessage } from "@/data/clinicChat/clinicChat.types";

export type ChatPreviewProps = {
  messages: ClinicMessage[];
};

export type ConversationLinkProps = {
  message: ClinicMessage;
};
