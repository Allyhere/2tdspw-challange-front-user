import type {
  PlanDayProps,
  TreatmentPlanProps,
} from "@/components/TreatmentPlan/TreatmentPlan.types";
import type { TreatmentAppointment } from "@/data/treatment/treatment.types";
import { formatBrl, formatDateTime } from "@/lib/format/format";
import { groupAppointmentsByDay } from "@/utils/groupAppointmentsByDay";

const visiblePlanCount = 10;

export function TreatmentPlan({ plan }: TreatmentPlanProps) {
  const days = groupAppointmentsByDay(plan.items.slice(0, visiblePlanCount));

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
      <ul className="flex flex-col gap-lg">
        {days.map((day) => (
          <PlanDay key={day.id} day={day} />
        ))}
      </ul>
    </section>
  );
}

function PlanDay({ day }: PlanDayProps) {
  return (
    <li className="flex flex-col gap-sm">
      <p
        id={day.id}
        className="flex items-center gap-sm font-inter text-caption text-text-secondary"
      >
        <span>{day.label}</span>
        <span className="h-px min-w-0 flex-1 bg-border-divider" aria-hidden="true" />
      </p>
      <ul aria-labelledby={day.id} className="flex flex-col gap-sm">
        {day.items.map((item) => (
          <TreatmentItemRow key={item.id} item={item} />
        ))}
      </ul>
    </li>
  );
}

function TreatmentItemRow({ item }: { item: TreatmentAppointment }) {
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
