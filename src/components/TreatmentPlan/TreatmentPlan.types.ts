import type { TreatmentAppointment, TreatmentPlanData } from "@/data/treatment/treatment.types";
import type { AppointmentDay } from "@/utils/groupAppointmentsByDay";

export type NoticeField = "whatsapp" | "web";

export type TreatmentPlanProps = {
  plan: TreatmentPlanData;
  uid: string | undefined;
  petId: string;
};

export type PlanDayProps = {
  day: AppointmentDay;
  pendingId: string | null;
  onToggle: (item: TreatmentAppointment, field: NoticeField, next: boolean) => void;
};

export type TreatmentItemRowProps = {
  item: TreatmentAppointment;
  pendingId: string | null;
  onToggle: (item: TreatmentAppointment, field: NoticeField, next: boolean) => void;
};
