import type { RefObject } from "react";
import type { MotionValue } from "motion/react";
import type { TreatmentPlanData } from "@/data/treatment/treatment.types";
import type { PlanScroll } from "@/hooks/usePlanScroll";
import type { AppointmentDay } from "@/utils/groupAppointmentsByDay";

export type TreatmentPlanProps = {
  plan: TreatmentPlanData;
  visibleCount?: number;
};

export type PlanDayProps = {
  day: AppointmentDay;
};

export type PlanListProps = {
  days: AppointmentDay[];
  scrollerRef: RefObject<HTMLDivElement | null>;
  scroll: PlanScroll;
};

export type PlanEdgeButtonProps = {
  label: string;
  direction: "up" | "down";
  cue: MotionValue<number>;
  scale: MotionValue<number>;
  blur: MotionValue<string>;
  enabled: boolean;
  className: string;
  onPress: () => void;
};
