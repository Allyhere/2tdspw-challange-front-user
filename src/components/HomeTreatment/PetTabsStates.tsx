import { cn } from "@/utils/cn";

import type { DetailsProps } from "@/components/HomeTreatment/PetTabsStates.types";

function Details({ details, className }: DetailsProps) {
  return (
    <p
      className={cn(
        "font-inter text-subtitle text-pretty text-text-primary tabular-nums",
        className,
      )}
    >
      {details.join(" · ")}
    </p>
  );
}

export const PetTabsStates = {
  Details,
};
