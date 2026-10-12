import { Button } from "react-aria-components";
import { bubbleSide, bubbleSurface } from "@/components/MessageList/MessageList.constants";
import type {
  MessageBubbleProps,
  MessageListProps,
} from "@/components/MessageList/MessageList.types";
import { formatDateTime } from "@/lib/format/format";
import { textLinkClass } from "@/styles/controls/controls.constants";

export function MessageList({ messages, onRetry }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <p className="font-roboto text-body text-text-primary">
        Nenhuma mensagem ainda.
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-lg">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} onRetry={onRetry} />
      ))}
    </ol>
  );
}

function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const author = message.author === "clinic" ? "Clínica" : "Você";

  return (
    <li className={`flex flex-col gap-xs ${bubbleSide[message.author]}`}>
      <article
        className={`max-w-bubble rounded-sm p-lg shadow-subtle ${bubbleSurface[message.author]} ${message.failed ? "border border-danger" : ""}`}
      >
        <p className="sr-only">{author}</p>
        <p className="font-roboto text-body text-pretty text-text-primary">
          {message.body}
        </p>
        <time
          className="mt-xs block font-inter text-caption text-text-primary"
          dateTime={message.sentAt}
        >
          {formatDateTime(message.sentAt)}
        </time>
      </article>
      {message.failed ? (
        <Button type="button" className={textLinkClass} onPress={() => onRetry(message.id)}>
          Tentar de novo
        </Button>
      ) : null}
    </li>
  );
}
