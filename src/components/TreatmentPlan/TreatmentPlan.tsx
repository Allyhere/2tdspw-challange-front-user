import type {
  TreatmentItemRowProps,
  TreatmentPlanProps,
} from "@/components/TreatmentPlan/TreatmentPlan.types";
import { formatBrl, formatPlanRecurrence } from "@/lib/format/format";

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
          <TreatmentItemRow key={item.planItemName} item={item} />
        ))}
      </ul>
    </section>
  );
}

function TreatmentItemRow({ item }: TreatmentItemRowProps) {
  return (
    <li className="rounded-md bg-surface-subtle px-lg py-md shadow-subtle">
      <h3 className="font-inter text-subtitle text-text-primary">
        {item.planItemName}
      </h3>
      <p className="font-inter text-subtitle text-text-primary">
        {formatBrl(item.price)}
      </p>
      <p className="font-inter text-caption text-text-primary">
        {formatPlanRecurrence(item)}
      </p>
    </li>
  );
}
