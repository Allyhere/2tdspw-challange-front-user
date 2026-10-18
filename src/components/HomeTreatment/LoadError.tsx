import { Button } from "react-aria-components";
import { statusClass } from "@/components/HomeTreatment/HomeTreatment.constants";
import type { LoadErrorProps } from "@/components/HomeTreatment/LoadError.types";
import { secondaryButtonClass } from "@/styles/controls/controls.constants";

export function LoadError({ message, onRetry }: LoadErrorProps) {
  return (
    <div className="flex flex-col items-start gap-md">
      <p className={statusClass}>{message}</p>
      <Button type="button" className={secondaryButtonClass} onPress={onRetry}>
        Tentar de novo
      </Button>
    </div>
  );
}
