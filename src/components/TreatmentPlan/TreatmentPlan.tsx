import type {
  TreatmentItemRowProps,
  TreatmentPlanProps,
} from "@/components/TreatmentPlan/TreatmentPlan.types";
import { formatBrl, formatDateTime } from "@/lib/format/format";

export function TreatmentPlan({ plan }: TreatmentPlanProps) {
  return (
    <section aria-labelledby="treatment-heading" className="flex flex-col gap-md">
      <h2
        id="treatment-heading"
        className="font-inter text-heading-2 text-balance text-text-primary"
      >
        Plano de tratamento
      </h2>
      <p className="font-inter text-subtitle text-pretty text-text-primary">
        {plan.summary}
      </p>
      <p className="font-inter text-body text-pretty text-text-primary italic">
        Não substitui avaliação presencial nem conduta individualizada
        pós-consulta.
      </p>
      <ul className="flex flex-col gap-sm">
        {plan.items.map((item) => (
          <TreatmentItemRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

function TreatmentItemRow({ item }: TreatmentItemRowProps) {
  return (
    <li className="flex items-center gap-md overflow-clip rounded-md bg-surface-subtle px-lg pt-sm pb-md shadow-card">
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-inter text-subtitle text-text-primary">
          {item.appointmentName}
        </h3>
        {item.appointmentPrice !== null ? (
          <p className="truncate font-inter text-body text-price tabular-nums">
            {formatBrl(item.appointmentPrice)}
          </p>
        ) : null}
      </div>
      <p className="shrink-0 text-end font-inter text-caption whitespace-nowrap text-text-primary/30">
        {formatDateTime(item.appointmentDate)}
      </p>
    </li>
  );
}
