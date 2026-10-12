import type { InfiniteData } from "@tanstack/react-query";
import { Button, Link } from "react-aria-components";
import type {
  ChatPreviewProps,
  ConversationLinkProps,
} from "@/components/ChatPreview/ChatPreview.types";
import { useInbox } from "@/data/clinicChat/useConversation";
import type { ConversationSummary, InboxPage } from "@/data/clinicChat/conversation.types";
import { formatDateTime } from "@/lib/format/format";
import { previewLinkClass, secondaryButtonClass } from "@/styles/controls/controls.constants";

const statusClass = "font-roboto text-body text-text-primary";

export function ClinicInbox({ uid }: { uid: string | undefined }) {
  const inbox = useInbox(uid);
  const items = flattenInbox(inbox.data);
  return (
    <ChatPreview
      items={items}
      isLoading={inbox.isLoading && items.length === 0}
      isError={inbox.isError}
      isOffline={inbox.fetchStatus === "paused" && items.length === 0}
      hasNextPage={inbox.hasNextPage}
      onRetry={() => void inbox.refetch()}
      onNextPage={() => void inbox.fetchNextPage()}
    />
  );
}

export function ChatPreview({
  items,
  isLoading,
  isError,
  isOffline,
  hasNextPage,
  onRetry,
  onNextPage,
}: ChatPreviewProps) {
  const showList = items.length > 1 || hasNextPage;

  return (
    <section aria-labelledby="chat-heading" className="flex flex-col gap-md">
      <h2
        id="chat-heading"
        className="font-inter text-heading-2 text-balance text-text-primary"
      >
        Conversa com a clínica
      </h2>
      <InboxBody
        items={items}
        showList={showList}
        isLoading={isLoading}
        isError={isError}
        isOffline={isOffline}
        onRetry={onRetry}
      />
      {hasNextPage ? (
        <Button type="button" className={secondaryButtonClass} onPress={onNextPage}>
          Carregar mais
        </Button>
      ) : null}
    </section>
  );
}

function InboxBody({
  items,
  showList,
  isLoading,
  isError,
  isOffline,
  onRetry,
}: Omit<ChatPreviewProps, "hasNextPage" | "onNextPage"> & { showList: boolean }) {
  if (isLoading) return <p className={statusClass}>Carregando conversas.</p>;
  if (isOffline) return <InboxProblem message="Você está offline." onRetry={onRetry} />;
  if (isError && items.length === 0) {
    return <InboxProblem message="Não foi possível carregar a conversa." onRetry={onRetry} />;
  }
  if (items.length === 0) return <p className={statusClass}>Nenhuma mensagem ainda.</p>;
  if (!showList && items[0]) return <ConversationLink item={items[0]} />;
  return (
    <ul className="flex flex-col gap-md">
      {items.map((item) => (
        <li key={item.id}>
          <ConversationLink item={item} />
        </li>
      ))}
    </ul>
  );
}

function InboxProblem({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-start gap-md">
      <p className={statusClass}>{message}</p>
      <Button type="button" className={secondaryButtonClass} onPress={onRetry}>
        Tentar de novo
      </Button>
    </div>
  );
}

function ConversationLink({ item }: ConversationLinkProps) {
  return (
    <Link href={`/conversation/${item.id}`} className={previewLinkClass}>
      <span className="font-roboto text-label text-text-primary underline">
        {item.petName} · {item.planItemName}
      </span>
      <p className="font-roboto text-body text-pretty text-text-primary">
        {item.lastMessage?.body ?? "Nenhuma mensagem ainda."}
      </p>
      {item.lastMessage ? (
        <time
          className="font-inter text-caption text-text-primary"
          dateTime={item.lastMessage.sentAt}
        >
          {formatDateTime(item.lastMessage.sentAt)}
        </time>
      ) : null}
    </Link>
  );
}

function flattenInbox(data: InfiniteData<InboxPage> | undefined): ConversationSummary[] {
  return data?.pages.flatMap((page) => page.items) ?? [];
}
