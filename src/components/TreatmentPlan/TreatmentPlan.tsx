import { Switch } from "react-aria-components";
import type {
  PlanDayProps,
  TreatmentItemRowProps,
  TreatmentPlanProps,
} from "@/components/TreatmentPlan/TreatmentPlan.types";
import { usePlanNotifications } from "@/data/owner/usePlanNotifications";
import { formatBrl, formatDateTime } from "@/lib/format/format";
import { groupAppointmentsByDay } from "@/utils/groupAppointmentsByDay";

const visiblePlanCount = 10;

export function TreatmentPlan({ plan, uid, petId }: TreatmentPlanProps) {
  const notices = usePlanNotifications(uid, petId);
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
      {notices.error ? (
        <p role="alert" className="font-roboto text-caption text-danger">
          {notices.error}
        </p>
      ) : null}
      <ul className="flex flex-col gap-lg">
        {days.map((day) => (
          <PlanDay
            key={day.id}
            day={day}
            pendingId={notices.pendingId}
            onToggle={notices.toggle}
          />
        ))}
      </ul>
    </section>
  );
}

function PlanDay({ day, pendingId, onToggle }: PlanDayProps) {
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
          <TreatmentItemRow
            key={item.id}
            item={item}
            pendingId={pendingId}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </li>
  );
}

function TreatmentItemRow({ item, pendingId, onToggle }: TreatmentItemRowProps) {
  const disabled = pendingId === item.id;

  return (
    <li className="flex flex-col gap-sm overflow-clip rounded-md bg-surface-subtle px-lg pt-sm pb-md shadow-card">
      <div className="flex items-center gap-md">
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
      </div>
      <div className="flex flex-wrap gap-lg">
        <NoticeSwitch
          label="WhatsApp"
          appointmentName={item.appointmentName}
          selected={item.notifyWhatsapp}
          disabled={disabled}
          onChange={(next) => onToggle(item, "whatsapp", next)}
        />
        <NoticeSwitch
          label="Web push"
          appointmentName={item.appointmentName}
          selected={item.notifyWeb}
          disabled={disabled}
          onChange={(next) => onToggle(item, "web", next)}
        />
      </div>
    </li>
  );
}

function NoticeSwitch({
  label,
  appointmentName,
  selected,
  disabled,
  onChange,
}: {
  label: string;
  appointmentName: string;
  selected: boolean;
  disabled: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <Switch
      isSelected={selected}
      isDisabled={disabled}
      onChange={onChange}
      aria-label={`${label} para ${appointmentName}`}
      className="group flex cursor-pointer items-center gap-sm font-roboto text-label text-text-primary outline-none data-disabled:cursor-not-allowed data-disabled:opacity-60 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
    >
      <span className="flex h-switch w-touch items-center rounded-pill bg-border-divider p-xs group-data-selected:justify-end group-data-selected:bg-primary">
        <span className="size-icon rounded-full bg-surface-base shadow-subtle" />
      </span>
      {label}
    </Switch>
  );
}
