import { AppHeader } from "@/components/AppHeader";
import { useAuth } from "@/auth/useAuth/useAuth";
import { inboxItems } from "@/data/clinicChat/conversation";
import { useInbox, useThread } from "@/data/clinicChat/useConversation";
import { useSendMessage } from "@/hooks/useSendMessage";
import { usePageTitle } from "@/lib/usePageTitle";
import { ConversationPanel } from "@/pages/conversation/ConversationPanel";
import { useParams } from "react-router-dom";

export function ConversationPage() {
  usePageTitle("Conversa com a clínica | Veti");
  const { conversationId } = useParams();
  const { user } = useAuth();
  const thread = useThread(user?.uid, conversationId);
  const send = useSendMessage(user?.uid, conversationId);
  const subject = inboxItems(useInbox(user?.uid).data).find((item) => item.id === conversationId);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <AppHeader />
      <main className="mx-auto flex min-h-0 w-full max-w-shell flex-1 flex-col md:px-lg md:pb-lg">
        <ConversationPanel
          title={subject?.pet.name ?? "Conversa com a clínica"}
          detail={subject?.planItemName ?? null}
          thread={thread}
          send={send}
        />
      </main>
    </div>
  );
}
