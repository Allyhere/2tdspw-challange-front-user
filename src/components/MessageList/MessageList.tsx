import { Button } from "react-aria-components";
import type {
  MessageBubbleProps,
  MessageListProps,
} from "@/components/PetHeader/MessageList.types";
import type { ChatDay, ChatRun } from "@/utils/groupChatMessages";
import { groupChatMessages } from "@/utils/groupChatMessages";
import { formatMessageTime } from "@/lib/format/format";
import { cn } from "@/utils/cn";

export function MessageList({ messages, onRetry }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <p className="mx-auto my-xl max-w-bubble text-center font-roboto text-body text-pretty text-text-primary">
        Nenhuma mensagem ainda. Escreva para a clínica quando quiser.
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-xl">
      {groupChatMessages(messages).map((day) => (
        <DayGroup key={day.id} day={day} onRetry={onRetry} />
      ))}
    </ol>
  );
}

function DayGroup({ day, onRetry }: { day: ChatDay; onRetry: MessageListProps["onRetry"] }) {
  return (
    <li className="flex flex-col gap-lg">
      <p className="sticky top-0 z-10 self-center rounded-pill bg-surface-base px-md py-xs font-roboto text-caption text-text-secondary shadow-subtle">
        <time dateTime={day.id}>{dayLabel(day.id)}</time>
      </p>
      <ol className="flex flex-col gap-lg">
        {day.runs.map((run) => (
          <AuthorRun key={run.id} run={run} onRetry={onRetry} />
        ))}
      </ol>
    </li>
  );
}

function AuthorRun({ run, onRetry }: { run: ChatRun; onRetry: MessageListProps["onRetry"] }) {
  const mine = run.author === "tutor";
  return (
    <li className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <ol className="flex max-w-bubble flex-col gap-sm">
        {run.messages.map((message) => (
          <MessageBubble key={message.id} message={message} onRetry={onRetry} />
        ))}
      </ol>
    </li>
  );
}

function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const mine = message.author === "tutor";
  const author = mine ? "Você" : "Clínica";
  return (
    <li className="flex min-w-0 flex-col gap-xs">
      <article
        className={cn(
          "rounded-sm px-lg py-sm shadow-subtle",
          bubbleFrame(mine, message.failed),
          message.pending && "opacity-70",
        )}
      >
        <p className="sr-only">{author}</p>
        <p className="font-roboto text-body wrap-break-word whitespace-pre-wrap text-pretty text-text-primary">
          {message.body}
        </p>
        <time
          className={cn(
            "mt-xs block text-right font-roboto text-caption tabular-nums",
            message.failed ? "text-danger" : "text-text-secondary",
          )}
          dateTime={message.sentAt}
        >
          {messageStatus(message.pending, message.failed, message.sentAt)}
        </time>
      </article>
      {message.failed ? (
        <Button
          type="button"
          className="inline-flex min-h-touch cursor-pointer items-center self-end font-roboto text-button text-text-primary outline-none transition-press data-hovered:text-primary-dark data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
          onPress={() => onRetry(message.id)}
        >
          Tentar de novo
        </Button>
      ) : null}
    </li>
  );
}

function bubbleFrame(mine: boolean, failed: boolean | undefined): string {
  if (failed && mine) return "border border-danger bg-whatsapp-bg";
  if (failed) return "border border-danger bg-surface-base";
  if (mine) return "bg-whatsapp-bg";
  return "border border-border-divider bg-surface-base";
}

function messageStatus(pending: boolean | undefined, failed: boolean | undefined, sentAt: string): string {
  if (pending) return "Enviando";
  if (failed) return "Não enviada";
  return formatMessageTime(sentAt);
}

function dayLabel(dayId: string): string {
  const date = dateFromDayId(dayId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - date.getTime()) / 86_400_000);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  const sameYear = date.getFullYear() === today.getFullYear();
  return new Intl.DateTimeFormat(
    "pt-BR",
    sameYear
      ? { day: "2-digit", month: "long" }
      : { day: "2-digit", month: "long", year: "numeric" },
  ).format(date);
}

function dateFromDayId(dayId: string): Date {
  const [year, month, day] = dayId.split("-").map(Number);
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
}
