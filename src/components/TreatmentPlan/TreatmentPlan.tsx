import { useRef } from "react";
import { Button } from "react-aria-components";
import { motion } from "motion/react";
import type {
  PlanDayProps,
  PlanEdgeButtonProps,
  PlanListProps,
  TreatmentPlanProps,
} from "@/components/TreatmentPlan/TreatmentPlan.types";
import type { TreatmentAppointment } from "@/data/treatment/treatment.types";
import { usePlanScroll } from "@/hooks/usePlanScroll";
import { formatBrl, formatDateTime } from "@/lib/format/format";
import { groupAppointmentsByDay } from "@/utils/groupAppointmentsByDay";

const scrollerClass =
  "overflow-y-auto overscroll-y-contain outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark";

const edgeButtonClass =
  "grid size-touch cursor-pointer place-items-center rounded-full bg-surface-base text-text-primary shadow-floating outline-none transition-press data-hovered:bg-surface-alt data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-default";

export function TreatmentPlan({ plan, visibleCount = 5 }: TreatmentPlanProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const days = groupAppointmentsByDay(plan.items);
  const scroll = usePlanScroll(scrollerRef, visibleCount, plan.items);

  return (
    <section aria-labelledby="treatment-heading" className="flex flex-col gap-md">
      <h2
        id="treatment-heading"
        className="font-inter text-heading-2 text-balance text-text-primary"
      >
        Plano de tratamento
      </h2>
      <p className="font-inter text-subtitle text-pretty text-text-primary">{plan.summary}</p>
      <p className="font-inter text-body text-pretty text-text-primary italic">
        Não substitui avaliação presencial nem conduta individualizada pós-consulta.
      </p>
      <PlanList days={days} scrollerRef={scrollerRef} scroll={scroll} />
    </section>
  );
}

function PlanList({ days, scrollerRef, scroll }: PlanListProps) {
  const bounded = scroll.windowHeight !== null;
  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        tabIndex={bounded ? 0 : undefined}
        aria-label="Itens do plano de tratamento"
        className={scrollerClass}
        style={{ maxHeight: scroll.windowHeight ?? "none" }}
      >
        <ul className="flex flex-col gap-lg">
          {days.map((day) => (
            <PlanDay key={day.id} day={day} />
          ))}
        </ul>
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-2xl bg-linear-to-b from-surface-base to-transparent"
        style={{ opacity: scroll.topOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2xl bg-linear-to-t from-surface-base to-transparent"
        style={{ opacity: scroll.bottomOpacity }}
      />
      <PlanEdgeButton
        label="Ver itens anteriores"
        direction="up"
        cue={scroll.topCue}
        scale={scroll.topScale}
        blur={scroll.topBlur}
        enabled={scroll.edges.up}
        className="top-0"
        onPress={() => scroll.scrollByPage(-1)}
      />
      <PlanEdgeButton
        label="Ver próximos itens"
        direction="down"
        cue={scroll.bottomCue}
        scale={scroll.bottomScale}
        blur={scroll.bottomBlur}
        enabled={scroll.edges.down}
        className="bottom-0"
        onPress={() => scroll.scrollByPage(1)}
      />
    </div>
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
    <li
      data-plan-item=""
      className="flex items-center gap-md overflow-clip rounded-md bg-surface-subtle px-lg pt-sm pb-md shadow-card"
    >
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-inter text-subtitle text-text-primary">{item.appointmentName}</h3>
        {item.appointmentPrice !== null ? (
          <p className="truncate font-inter text-body text-price tabular-nums">{formatBrl(item.appointmentPrice)}</p>
        ) : null}
      </div>
      <p className="shrink-0 text-end font-inter text-caption whitespace-nowrap text-text-primary/30 tabular-nums">
        {formatDateTime(item.appointmentDate)}
      </p>
    </li>
  );
}

function PlanEdgeButton({
  label,
  direction,
  cue,
  scale,
  blur,
  enabled,
  className,
  onPress,
}: PlanEdgeButtonProps) {
  const path = direction === "up" ? "M3.25 10.25 8 5.5l4.75 4.75" : "M3.25 5.75 8 10.5l4.75-4.75";
  return (
    <motion.div
      aria-hidden={!enabled}
      className={`absolute left-1/2 z-20 -translate-x-1/2 ${enabled ? "pointer-events-auto" : "pointer-events-none"} ${className}`}
      style={{ opacity: cue, scale, filter: blur }}
    >
      <Button type="button" aria-label={label} isDisabled={!enabled} onPress={onPress} className={edgeButtonClass}>
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-lg">
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </motion.div>
  );
}
