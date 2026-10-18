import { Link } from "react-aria-components";
import { AppHeader } from "@/components/AppHeader";
import { usePageTitle } from "@/lib/usePageTitle";
import { previewLinkClass } from "@/styles/controls/controls.constants";

export function ConfigPage() {
  usePageTitle("Configurações | Veti");

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-shell flex-col gap-xl px-lg py-xl">
        <h1 className="font-inter text-heading-1 text-balance text-text-primary">
          Configurações
        </h1>
        <Link href="/notification" className={previewLinkClass}>
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
