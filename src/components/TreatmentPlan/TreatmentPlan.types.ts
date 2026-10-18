import type { TreatmentPlanData } from "@/data/treatment/treatment.types";
import type { AppointmentDay } from "@/utils/groupAppointmentsByDay";

export type TreatmentPlanProps = {
  plan: TreatmentPlanData;
};

export type PlanDayProps = {
  day: AppointmentDay;
};
