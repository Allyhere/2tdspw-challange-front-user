import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "react-aria-components";
import type { UseQueryResult } from "@tanstack/react-query";
import { MessageList } from "@/components/MessageList/MessageList";
import type { ConversationThread } from "@/data/clinicChat/conversation.types";
import { withPendingMessage } from "@/data/clinicChat/withPendingMessage";
import { useChatScroll } from "@/hooks/useChatScroll";
import type { useSendMessage } from "@/hooks/useSendMessage";
import { ApiError } from "@/lib/api/api.types";
import { MessageComposer } from "@/pages/conversation/MessageComposer";
import { ConversationHeader } from "@/pages/conversation/ConversationHeader";

type SendControls = ReturnType<typeof useSendMessage>;

export function ConversationPanel({
  title,
  detail,
  thread,
  send,
}: {
  title: string;
  detail: string | null;
  thread: UseQueryResult<ConversationThread>;
  send: SendControls;
}) {
  const messages = withPendingMessage(thread.data?.messages ?? [], send.draft);
  const waiting = send.isSending && thread.data?.agentEnabled === true;

  return (
    <section
      aria-labelledby="conversation-heading"
      className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface-base shadow-floating md:rounded-md"
    >
      <ConversationHeader title={title} detail={detail} />
      <ConversationTranscript
        messages={messages}
        waiting={waiting}
        sendFailed={send.draft?.failed === true}
        isLoading={thread.isLoading && !thread.data}
        isOffline={thread.fetchStatus === "paused" && !thread.data}
        isMissing={thread.error instanceof ApiError && thread.error.status === 404}
        isError={thread.isError && !thread.data}
        onRetryLoad={() => void thread.refetch()}
        onRetrySend={send.retry}
      />
      <MessageComposer
        disabled={send.isSending || (send.draft !== null && !send.draft.failed) || !thread.data}
        onSend={send.send}
      />
    </section>
  );
}

type TranscriptProps = {
  messages: ReturnType<typeof withPendingMessage>;
  waiting: boolean;
  sendFailed: boolean;
  isLoading: boolean;
  isOffline: boolean;
  isMissing: boolean;
  isError: boolean;
  onRetryLoad: () => void;
  onRetrySend: (id: string) => void;
};

function ConversationTranscript({
  messages,
  waiting,
  sendFailed,
  isLoading,
  isOffline,
  isMissing,
  isError,
  onRetryLoad,
  onRetrySend,
}: TranscriptProps) {
  const last = messages.at(-1);
  const anchor = `${last?.id ?? "none"}:${String(Boolean(last?.failed))}:${String(waiting)}`;
  const { scrollerRef, awayFromLatest, onScroll, jumpToLatest } = useChatScroll(anchor);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto overscroll-contain bg-surface-alt px-lg py-lg"
      >
        <TranscriptBody
          blocked={isLoading || isOffline || isMissing || isError}
          isLoading={isLoading}
          isOffline={isOffline}
          isMissing={isMissing}
          isError={isError}
          messages={messages}
          waiting={waiting}
          onRetryLoad={onRetryLoad}
          onRetrySend={onRetrySend}
        />
      </div>
      <SendStatus waiting={waiting} failed={sendFailed} />
      {awayFromLatest ? (
        <div className="flex shrink-0 justify-center border-t border-border-divider bg-surface-base py-xs">
          <JumpToLatest onPress={jumpToLatest} />
        </div>
      ) : null}
    </div>
  );
}

function JumpToLatest({ onPress }: { onPress: () => void }) {
  return (
    <Button
      type="button"
      className="inline-flex min-h-touch cursor-pointer items-center gap-xs rounded-pill bg-surface-base px-lg font-roboto text-button text-primary shadow-subtle outline-none transition-press data-hovered:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
      onPress={onPress}
    >
      <CaretDownIcon className="size-lg" aria-hidden="true" weight="bold" />
      Novas mensagens
    </Button>
  );
}

function SendStatus({ waiting, failed }: { waiting: boolean; failed: boolean }) {
  return (
    <p aria-live="polite" className="sr-only">
      {waiting ? "A clínica está respondendo" : ""}
      {failed ? "Não foi possível enviar a mensagem." : ""}
    </p>
  );
}

function TranscriptBody({
  blocked,
  isLoading,
  isOffline,
  isMissing,
  isError,
  messages,
  waiting,
  onRetryLoad,
  onRetrySend,
}: {
  blocked: boolean;
  isLoading: boolean;
  isOffline: boolean;
  isMissing: boolean;
  isError: boolean;
  messages: ReturnType<typeof withPendingMessage>;
  waiting: boolean;
  onRetryLoad: () => void;
  onRetrySend: (id: string) => void;
}) {
  if (blocked) {
    return (
      <ThreadStatus
        isLoading={isLoading}
        isOffline={isOffline}
        isMissing={isMissing}
        isError={isError}
        onRetry={onRetryLoad}
      />
    );
  }

  return (
    <div className="mt-auto flex flex-col gap-lg">
      <MessageList messages={messages} onRetry={onRetrySend} />
      {waiting ? <ClinicTyping /> : null}
    </div>
  );
}

function ClinicTyping() {
  return (
    <p className="flex max-w-bubble items-center gap-sm self-start rounded-sm border border-border-divider bg-surface-base px-lg py-sm font-roboto text-body text-text-primary shadow-subtle">
      A clínica está respondendo
      <span className="inline-flex items-center gap-xs" aria-hidden="true">
        <span className="chat-dot size-xs rounded-full bg-primary" />
        <span className="chat-dot size-xs rounded-full bg-primary" style={{ animationDelay: "160ms" }} />
        <span className="chat-dot size-xs rounded-full bg-primary" style={{ animationDelay: "320ms" }} />
      </span>
    </p>
  );
}

function ThreadStatus({
  isLoading,
  isOffline,
  isMissing,
  isError,
  onRetry,
}: {
  isLoading: boolean;
  isOffline: boolean;
  isMissing: boolean;
  isError: boolean;
  onRetry: () => void;
}) {
  if (isLoading) return <ThreadSkeleton />;
  if (isOffline) return <StatusProblem message="Você está offline." onRetry={onRetry} />;
  if (isMissing) {
    return <p className="m-auto font-roboto text-body text-pretty text-text-primary">Conversa não encontrada.</p>;
  }
  if (isError) return <StatusProblem message="Não foi possível carregar a conversa." onRetry={onRetry} />;
  return null;
}

function ThreadSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="mt-auto flex flex-col gap-lg">
      <p className="sr-only">Carregando conversa.</p>
      <span aria-hidden="true" className="h-2xl w-3/5 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
      <span aria-hidden="true" className="h-2xl w-2/5 self-end animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
      <span aria-hidden="true" className="h-2xl w-1/2 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
    </div>
  );
}

function StatusProblem({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="m-auto flex flex-col items-start gap-md">
      <p className="font-roboto text-body text-pretty text-text-primary">{message}</p>
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
