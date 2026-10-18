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
import { secondaryButtonClass, textLinkClass } from "@/styles/controls/controls.constants";

const statusClass = "font-roboto text-body text-text-primary";

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
        <Link href="/home" className={textLinkClass}>
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
        <p aria-live="polite" className={statusClass}>
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
  if (isLoading) return <p className={statusClass}>Carregando conversa.</p>;
  if (isOffline) return <StatusProblem message="Você está offline." onRetry={onRetry} />;
  if (isMissing) return <p className={statusClass}>Conversa não encontrada.</p>;
  if (isError) return <StatusProblem message="Não foi possível carregar a conversa." onRetry={onRetry} />;
  return null;
}

function StatusProblem({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-start gap-md">
      <p className={statusClass}>{message}</p>
      <Button type="button" className={secondaryButtonClass} onPress={onRetry}>
        Tentar de novo
      </Button>
    </div>
  );
}
