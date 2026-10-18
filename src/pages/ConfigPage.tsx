import { Link } from "react-aria-components";
import { AppHeader } from "@/components/AppHeader";
import { usePageTitle } from "@/lib/usePageTitle";

export function ConfigPage() {
  usePageTitle("Configurações | Veti");

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-shell flex-col gap-xl px-lg py-xl">
        <h1 className="font-inter text-heading-1 text-balance text-text-primary">
          Configurações
        </h1>
        <Link
          href="/notification"
          className="flex min-h-touch flex-col gap-xs rounded-md bg-surface-base p-lg no-underline shadow-card outline-none transition-surface data-hovered:shadow-floating data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
        >
          <span className="font-roboto text-label text-text-primary underline">
            Notificações
          </span>
          <p className="font-roboto text-body text-pretty text-text-primary">
            Silencie os avisos por um dia, um mês, três meses ou nunca.
          </p>
        </Link>
      </main>
    </>
  );
}
