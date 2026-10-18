import { Link, RadioButton, RadioField, RadioGroup } from "react-aria-components";
import { AppHeader } from "@/components/AppHeader";
import { useAuth } from "@/auth/useAuth/useAuth";
import { formatSilenceUntil } from "@/lib/format/format";
import { useNotificationSilence } from "@/lib/persist/useNotificationSilence";
import { usePageTitle } from "@/lib/usePageTitle";
import { textLinkClass } from "@/styles/controls/controls.constants";
import type { SilenceChoice } from "@/utils/silenceChoice";

const radioClass =
  "flex min-h-touch cursor-pointer items-center rounded-md border border-border-divider bg-surface-base px-lg font-inter text-body text-text-primary outline-none transition-press data-selected:border-primary data-selected:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark";

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
        <Link href="/config" className={textLinkClass}>
          Voltar às configurações
        </Link>
        <p className="font-inter text-body text-pretty text-text-primary">
          Escolha por quanto tempo silenciar os avisos.
        </p>
        {silence.ready ? (
          <SilenceOptions choice={silence.choice} onSelect={silence.select} />
        ) : (
          <p className="font-inter text-body text-text-primary">Carregando preferência.</p>
        )}
        <p
          role="status"
          className="font-inter text-body text-pretty text-text-primary tabular-nums"
        >
          {silence.until
            ? `Avisos silenciados até ${formatSilenceUntil(silence.until)}.`
            : "Os avisos continuam ativos."}
        </p>
      </main>
    </>
  );
}

function SilenceOptions({
  choice,
  onSelect,
}: {
  choice: SilenceChoice;
  onSelect: (value: string) => void;
}) {
  return (
    <RadioGroup
      aria-label="Por quanto tempo silenciar"
      value={choice}
      onChange={onSelect}
      className="flex flex-col gap-sm"
    >
      <RadioField value="day">
        <RadioButton className={radioClass}>Um dia</RadioButton>
      </RadioField>
      <RadioField value="month">
        <RadioButton className={radioClass}>Um mês</RadioButton>
      </RadioField>
      <RadioField value="three-months">
        <RadioButton className={radioClass}>Três meses</RadioButton>
      </RadioField>
      <RadioField value="never">
        <RadioButton className={radioClass}>Nunca</RadioButton>
      </RadioField>
    </RadioGroup>
  );
}
