export type PlanRecurrence = "single" | "recurrent";

export type TreatmentItem = {
  planItemName: string;
  planRecurrency: PlanRecurrence;
  planRecurrencyRate?: number;
  planDurationInMonths: number;
  price: number;
};

export type Pet = {
  name: string;
  breed: string;
  isCastrated: boolean;
  weightKg: number;
  ageYears: number;
};

export type TreatmentPlanData = {
  summary: string;
  items: TreatmentItem[];
};
