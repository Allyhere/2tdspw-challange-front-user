export type MessageAuthor = "clinic" | "tutor";

export type ClinicMessage = {
  id: string;
  author: MessageAuthor;
  body: string;
  sentAt: string;
};
