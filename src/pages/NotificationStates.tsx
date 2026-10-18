import { RadioButton, RadioField, RadioGroup } from "react-aria-components";
import { formatSilenceUntil } from "@/lib/format/format";
import { cn } from "@/utils/cn";
import type {
  ActiveProps,
  LoadingProps,
  OptionsProps,
  SilencedProps,
} from "@/pages/NotificationStates.types";

function Options({ choice, onSelect, className }: OptionsProps) {
  return (
    <RadioGroup
      aria-label="Por quanto tempo silenciar"
      value={choice}
      onChange={onSelect}
      className={cn("flex flex-col gap-sm", className)}
    >
      <RadioField value="day">
        <RadioButton className="flex min-h-touch cursor-pointer items-center rounded-md border border-border-divider bg-surface-base px-lg font-inter text-body text-text-primary outline-none transition-press data-selected:border-primary data-selected:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark">
          Um dia
        </RadioButton>
      </RadioField>
      <RadioField value="month">
        <RadioButton className="flex min-h-touch cursor-pointer items-center rounded-md border border-border-divider bg-surface-base px-lg font-inter text-body text-text-primary outline-none transition-press data-selected:border-primary data-selected:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark">
          Um mês
        </RadioButton>
      </RadioField>
      <RadioField value="three-months">
        <RadioButton className="flex min-h-touch cursor-pointer items-center rounded-md border border-border-divider bg-surface-base px-lg font-inter text-body text-text-primary outline-none transition-press data-selected:border-primary data-selected:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark">
          Três meses
        </RadioButton>
      </RadioField>
      <RadioField value="never">
        <RadioButton className="flex min-h-touch cursor-pointer items-center rounded-md border border-border-divider bg-surface-base px-lg font-inter text-body text-text-primary outline-none transition-press data-selected:border-primary data-selected:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark">
          Nunca
        </RadioButton>
      </RadioField>
    </RadioGroup>
  );
}

function Loading({ className }: LoadingProps) {
  return (
    <p className={cn("font-inter text-body text-text-primary", className)}>
      Carregando preferência.
    </p>
  );
}

function Silenced({ until, className }: SilencedProps) {
  return (
    <p
      role="status"
      className={cn(
        "font-inter text-body text-pretty text-text-primary tabular-nums",
        className,
      )}
    >
      Avisos silenciados até {formatSilenceUntil(until)}.
    </p>
  );
}

function Active({ className }: ActiveProps) {
  return (
    <p
      role="status"
      className={cn(
        "font-inter text-body text-pretty text-text-primary tabular-nums",
        className,
      )}
    >
      Os avisos continuam ativos.
    </p>
  );
}

export const NotificationStates = {
  Options,
  Loading,
  Silenced,
  Active,
};
