import { Link } from "react-aria-components";
import { AppHeader } from "@/components/AppHeader";
import { MessageList } from "@/components/MessageList/MessageList";
import { clinicMessages } from "@/data/clinicChat/clinicChat.constants";
import { usePageTitle } from "@/lib/usePageTitle";
import { textLinkClass } from "@/styles/controls/controls.constants";

export function ConversationPage() {
  usePageTitle("Conversa com a clínica | Veti");

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
        <MessageList messages={clinicMessages} />
      </main>
    </>
  );
}
