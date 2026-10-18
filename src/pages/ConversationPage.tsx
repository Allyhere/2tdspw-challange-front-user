import { Button, Link } from "react-aria-components";
import { useParams } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { MessageList } from "@/components/MessageList/MessageList";
import { useAuth } from "@/auth/useAuth/useAuth";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useThread } from "@/data/clinicChat/useConversation";
import { withPendingMessage } from "@/data/clinicChat/withPendingMessage";
import { ApiError } from "@/lib/api/api.types";
import { usePageTitle } from "@/lib/usePageTitle";
import { MessageComposer } from "@/pages/conversation/MessageComposer";

export function ConversationPage() {
  usePageTitle("Conversa com a clínica | Veti");
  const { conversationId } = useParams();
  const { user } = useAuth();
  const thread = useThread(user?.uid, conversationId);
  const send = useSendMessage(user?.uid, conversationId);
  const messages = withPendingMessage(thread.data?.messages ?? [], send.draft);
  const waiting = send.isSending && thread.data?.agentEnabled === true;

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-shell flex-col gap-lg px-lg py-xl">
        <h1 className="font-inter text-heading-1 text-balance text-text-primary">
          Conversa com a clínica
        </h1>
        <Link
          href="/home"
          className="inline-flex min-h-touch items-center font-roboto text-button text-text-primary underline outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
        >
          Voltar ao plano
        </Link>
        <ThreadStatus
          isLoading={thread.isLoading && !thread.data}
          isOffline={thread.fetchStatus === "paused" && !thread.data}
          isMissing={thread.error instanceof ApiError && thread.error.status === 404}
          isError={thread.isError && !thread.data}
          onRetry={() => void thread.refetch()}
        />
        {thread.data || send.draft ? <MessageList messages={messages} onRetry={send.retry} /> : null}
        <p aria-live="polite" className="font-roboto text-body text-text-primary">
          {waiting ? "A clínica está respondendo" : ""}
          {send.draft?.failed ? "Não foi possível enviar a mensagem." : ""}
        </p>
        <MessageComposer
          disabled={send.isSending || (send.draft !== null && !send.draft.failed) || !thread.data}
          onSend={send.send}
        />
      </main>
    </>
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
  if (isLoading) return <p className="font-roboto text-body text-text-primary">Carregando conversa.</p>;
  if (isOffline) return <StatusProblem message="Você está offline." onRetry={onRetry} />;
  if (isMissing) return <p className="font-roboto text-body text-text-primary">Conversa não encontrada.</p>;
  if (isError) return <StatusProblem message="Não foi possível carregar a conversa." onRetry={onRetry} />;
  return null;
}

function StatusProblem({ message, onRetry }: { message: string; onRetry: () => void }) {
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
