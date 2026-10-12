import { z } from "zod";
import type { TutorPet } from "@/auth/session/session.types";
import { apiGet } from "@/lib/api/api";
import type { Pet, TreatmentPlanData } from "@/data/treatment/treatment.types";

const appointmentSchema = z.object({
  id: z.string(),
  appointmentName: z.string(),
  appointmentPrice: z.number().nullable(),
  appointmentDate: z.string(),
});

const planSchema = z.object({
  carePlanDescription: z.string(),
  carePlan: z.array(appointmentSchema),
});

export function toPet(pet: TutorPet): Pet {
  return {
    name: pet.name,
    breed: pet.breed,
    isCastrated: pet.isCastrated,
    weightKg: pet.weight,
    ageYears: pet.age,
  };
}

export async function fetchTreatmentPlan(petId: string): Promise<TreatmentPlanData> {
  const path = `/owner/${encodeURIComponent(petId)}/plan`;
  const plan = await apiGet(path, planSchema);
  return {
    summary: plan.carePlanDescription,
    items: plan.carePlan.map((item) => ({
      id: item.id,
      appointmentName: item.appointmentName,
      appointmentPrice: item.appointmentPrice,
      appointmentDate: item.appointmentDate,
    })),
  };
}
