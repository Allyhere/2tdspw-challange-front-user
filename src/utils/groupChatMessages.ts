import type { ClinicMessage, MessageAuthor } from "@/data/clinicChat/clinicChat.types";

export type ChatRun = {
  id: string;
  author: MessageAuthor;
  messages: ClinicMessage[];
};

export type ChatDay = {
  id: string;
  runs: ChatRun[];
};

export function groupChatMessages(messages: ClinicMessage[]): ChatDay[] {
  const days: ChatDay[] = [];
  for (const message of messages) {
    const day = dayFor(days, calendarDayId(message.sentAt));
    const run = day.runs.at(-1);
    if (run && run.author === message.author) {
      run.messages.push(message);
      continue;
    }
    day.runs.push({ id: message.id, author: message.author, messages: [message] });
  }
  return days;
}

function dayFor(days: ChatDay[], id: string): ChatDay {
  const current = days.find((day) => day.id === id);
  if (current) return current;
  const day = { id, runs: [] };
  days.push(day);
  return day;
}

function calendarDayId(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}
