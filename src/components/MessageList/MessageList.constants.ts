import type { MessageAuthor } from "@/data/clinicChat/clinicChat.types";

export const bubbleSide: Record<MessageAuthor, string> = {
  clinic: "items-start",
  tutor: "items-end",
};

export const bubbleSurface: Record<MessageAuthor, string> = {
  clinic: "bg-surface-base",
  tutor: "bg-whatsapp-bg",
};
