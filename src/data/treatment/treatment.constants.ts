import type { Pet, TreatmentPlanData } from "@/data/treatment/treatment.types";

export const pet: Pet = {
  name: "Luna",
  breed: "SRD",
  isCastrated: true,
  weightKg: 8.2,
  ageYears: 4,
};

export const treatmentPlan: TreatmentPlanData = {
  summary: "V10 · dose única · 12 meses. Vermífugo · a cada 3 meses · 12 meses.",
  items: [
    {
      planItemName: "V10",
      planRecurrency: "single",
      planDurationInMonths: 12,
      price: 95,
    },
    {
      planItemName: "Vermífugo",
      planRecurrency: "recurrent",
      planRecurrencyRate: 3,
      planDurationInMonths: 12,
      price: 45,
    },
  ],
};
