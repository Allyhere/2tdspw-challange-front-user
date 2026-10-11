import { Link } from "react-aria-components";
import type {
  ChatPreviewProps,
  ConversationLinkProps,
} from "@/components/ChatPreview/ChatPreview.types";
import { formatSentAt } from "@/lib/format/format";
import { previewLinkClass } from "@/styles/controls/controls.constants";

export function ChatPreview({ messages }: ChatPreviewProps) {
  const lastMessage = messages.at(-1);

  return (
    <section aria-labelledby="chat-heading" className="flex flex-col gap-md">
      <h2
        id="chat-heading"
        className="font-inter text-heading-2 text-balance text-text-primary"
      >
        Conversa com a clínica
      </h2>
      {lastMessage ? (
        <ConversationLink message={lastMessage} />
      ) : (
        <p className="font-roboto text-body text-text-primary">
          Nenhuma mensagem ainda.
        </p>
      )}
    </section>
  );
}

function ConversationLink({ message }: ConversationLinkProps) {
  return (
    <Link href="/conversation" className={previewLinkClass}>
      <span className="font-roboto text-label text-text-primary underline">
        Abrir conversa
      </span>
      <p className="font-roboto text-body text-pretty text-text-primary">
        {message.body}
      </p>
      <time
        className="font-inter text-caption text-text-primary"
        dateTime={message.sentAt}
      >
        {formatSentAt(message.sentAt)}
      </time>
    </Link>
  );
}
