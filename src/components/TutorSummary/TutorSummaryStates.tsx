import { EnvelopeIcon, IdentificationCardIcon, PhoneIcon } from "@phosphor-icons/react";

import { SparklesText } from "@/components/SparklesText/SparklesText";
import { cn } from "@/utils/cn";

import type {
  DetailsProps,
  NameProps,
} from "@/components/TutorSummary/TutorSummaryStates.types";
import { useCurrentHour } from "@/hooks/useCurrentHour";

function Name({ name, className }: NameProps) {
  const hour = useCurrentHour();
  const greeting =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <h1
      id="tutor-heading"
      className={cn(
        "font-inter text-display-sm text-balance text-text-primary md:text-display",
        className,
      )}
    >
      {greeting},{" "}
      <SparklesText className="font-semibold text-primary">{name}</SparklesText>
    </h1>
  );
}

function Details({ email, phone, document: documentNumber, className }: DetailsProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-lg gap-y-sm font-roboto text-body text-text-primary",
        className,
      )}
    >
      {email ? (
        <li className="flex items-center gap-sm">
          <EnvelopeIcon aria-hidden="true" className="size-lg shrink-0 text-primary" />
          <span className="text-pretty">{email}</span>
        </li>
      ) : null}
      {phone ? (
        <li className="flex items-center gap-sm">
          <PhoneIcon aria-hidden="true" className="size-lg shrink-0 text-primary" />
          <span className="text-pretty tabular-nums">{phone}</span>
        </li>
      ) : null}
      {documentNumber ? (
        <li className="flex items-center gap-sm">
          <IdentificationCardIcon aria-hidden="true" className="size-lg shrink-0 text-primary" />
          <span className="text-pretty tabular-nums">{documentNumber}</span>
        </li>
      ) : null}
    </ul>
  );
}

export const TutorSummaryStates = {
  Name,
  Details,
};
