import { Button, Link } from "react-aria-components";
import type {
  ChatPreviewProps,
  ConversationLinkProps,
} from "@/components/ChatPreview/ChatPreview.types";
import { Show } from "@/components/Show/Show";
import { inboxItems } from "@/data/clinicChat/conversation";
import { useInbox } from "@/data/clinicChat/useConversation";
import { formatDateTime } from "@/lib/format/format";

export function ClinicInbox({ uid, petId }: { uid: string | undefined; petId: string }) {
  const inbox = useInbox(uid);
  const items = inboxItems(inbox.data).filter((item) => item.pet.id === petId);
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
        <Button
          type="button"
          className="inline-flex min-h-touch cursor-pointer items-center justify-center rounded-md border border-border-divider bg-surface-base p-lg font-roboto text-button-lg text-text-primary outline-none transition-press data-hovered:bg-surface-alt data-pressed:scale-press data-pressed:bg-primary-light data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-not-allowed data-disabled:opacity-60"
          onPress={onNextPage}
        >
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
  if (isLoading) return <p className="font-roboto text-body text-text-primary">Carregando conversas.</p>;
  if (isOffline) return <InboxProblem message="Você está offline." onRetry={onRetry} />;
  if (isError && items.length === 0) {
    return <InboxProblem message="Não foi possível carregar a conversa." onRetry={onRetry} />;
  }
  if (items.length === 0) return <p className="font-roboto text-body text-text-primary">Nenhuma mensagem ainda.</p>;
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
      <p className="font-roboto text-body text-text-primary">{message}</p>
      <Button
        type="button"
        className="inline-flex min-h-touch cursor-pointer items-center justify-center rounded-md border border-border-divider bg-surface-base p-lg font-roboto text-button-lg text-text-primary outline-none transition-press data-hovered:bg-surface-alt data-pressed:scale-press data-pressed:bg-primary-light data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-not-allowed data-disabled:opacity-60"
        onPress={onRetry}
      >
        Tentar de novo
      </Button>
    </div>
  );
}

function ConversationLink({ item }: ConversationLinkProps) {
  return (
    <Link
      href={`/conversation/${item.id}`}
      className="flex min-h-touch flex-col gap-xs rounded-md bg-surface-base p-lg no-underline shadow-card outline-none transition-surface data-hovered:shadow-floating data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
    >
      <span className="font-roboto text-label text-text-primary underline">
        {item.pet.name} · {item.planItemName}
      </span>
      <p className="font-roboto text-body text-pretty text-text-primary">
        {item.lastMessage?.body ?? "Nenhuma mensagem ainda."}
      </p>
      <Show.When when={item.lastMessage}>
        {(message) => (
          <time
            className="font-inter text-caption text-text-primary tabular-nums"
            dateTime={message.sentAt}
          >
            {formatDateTime(message.sentAt)}
          </time>
        )}
      </Show.When>
    </Link>
  );
}

