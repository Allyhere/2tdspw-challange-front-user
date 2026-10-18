import { Link } from "react-aria-components";
import { AppHeader } from "@/components/AppHeader";
import { Show } from "@/components/Show/Show";
import { useAuth } from "@/auth/useAuth/useAuth";
import { useNotificationSilence } from "@/lib/persist/useNotificationSilence";
import { usePageTitle } from "@/lib/usePageTitle";
import { NotificationStates } from "@/pages/NotificationStates";

export function NotificationPage() {
  usePageTitle("Notificações | Veti");
  const { user } = useAuth();
  const silence = useNotificationSilence(user?.uid);

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-shell flex-col gap-xl px-lg py-xl">
        <h1 className="font-inter text-heading-1 text-balance text-text-primary">
          Notificações
        </h1>
        <Link
          href="/config"
          className="inline-flex min-h-touch items-center font-roboto text-button text-text-primary underline outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
        >
          Voltar às configurações
        </Link>
        <p className="font-inter text-body text-pretty text-text-primary">
          Escolha por quanto tempo silenciar os avisos.
        </p>
        <Show>
          <Show.When when={silence.ready}>
            <NotificationStates.Options
              choice={silence.choice}
              onSelect={silence.select}
            />
          </Show.When>
          <Show.Otherwise>
            <NotificationStates.Loading />
          </Show.Otherwise>
        </Show>
        <Show>
          <Show.When when={silence.until}>
            {(until) => <NotificationStates.Silenced until={until} />}
          </Show.When>
          <Show.Otherwise>
            <NotificationStates.Active />
          </Show.Otherwise>
        </Show>
      </main>
    </>
  );
}
