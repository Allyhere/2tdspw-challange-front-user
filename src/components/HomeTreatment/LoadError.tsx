import { Button } from "react-aria-components";
import type { LoadErrorProps } from "@/components/HomeTreatment/LoadError.types";

export function LoadError({ message, onRetry }: LoadErrorProps) {
  return (
    <div className="flex flex-col items-start gap-md">
      <p className="font-inter text-body text-pretty text-text-primary">{message}</p>
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
