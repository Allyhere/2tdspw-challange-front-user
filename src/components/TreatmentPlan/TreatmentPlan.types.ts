import type { TreatmentAppointment, TreatmentPlanData } from "@/data/treatment/treatment.types";

export type TreatmentPlanProps = {
  plan: TreatmentPlanData;
};

export type TreatmentItemRowProps = {
  item: TreatmentAppointment;
};

export type AppointmentPriceProps = {
  price: number | null;
};
