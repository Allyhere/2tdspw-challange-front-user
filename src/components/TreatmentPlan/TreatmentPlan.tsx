import { Button } from "react-aria-components";
import { removeItemButtonClass } from "@/components/TreatmentPlan/TreatmentPlan.constants";
import type {
  RemoveItemButtonProps,
  TreatmentItemRowProps,
  TreatmentPlanProps,
} from "@/components/TreatmentPlan/TreatmentPlan.types";
import { formatBrl, formatPlanRecurrence } from "@/lib/format/format";

export function TreatmentPlan({ plan, onRemove }: TreatmentPlanProps) {
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
          <TreatmentItemRow
            key={item.planItemName}
            item={item}
            onRemove={() => onRemove(item)}
          />
        ))}
      </ul>
    </section>
  );
}

function TreatmentItemRow({
  item,
  isDisabled = false,
  onRemove,
}: TreatmentItemRowProps) {
  return (
    <li className="flex items-center gap-md overflow-clip rounded-md bg-surface-subtle px-lg pt-sm pb-md shadow-card">
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-inter text-subtitle text-text-primary">
          {item.planItemName}
        </h3>
        <p className="truncate font-inter text-body text-price tabular-nums">
          {formatBrl(item.price)}
        </p>
      </div>
      <p className="shrink-0 text-end font-inter text-caption whitespace-nowrap text-text-primary/30">
        {formatPlanRecurrence(item)}
      </p>
      <RemoveItemButton isDisabled={isDisabled} onRemove={onRemove} />
    </li>
  );
}

function RemoveItemButton({ isDisabled, onRemove }: RemoveItemButtonProps) {
  return (
    <Button
      type="button"
      aria-label="Remover item"
      isDisabled={isDisabled}
      onPress={onRemove}
      className={removeItemButtonClass}
    >
      <TrashIcon />
    </Button>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
