import { z } from "zod";
import type { AuthUser, TutorPet } from "@/auth/session/session.types";
import { apiGet, apiSendJson } from "@/lib/api/api";
import type { Pet, TreatmentPlanData } from "@/data/treatment/treatment.types";

const petSchema = z.object({
  id: z.string(),
  name: z.string(),
  breed: z.string(),
  sex: z.enum(["M", "F"]),
  weight: z.number(),
  age: z.number(),
  isCastrated: z.boolean(),
  species: z.string(),
});

const ownerSchema = z.object({
  name: z.string(),
  email: z.string(),
  telephone: z.string(),
  document: z.string(),
  pets: z.array(petSchema),
});

export type OwnerProfile = z.infer<typeof ownerSchema>;

const appointmentSchema = z.object({
  id: z.string(),
  appointmentName: z.string(),
  appointmentPrice: z.number().nullable(),
  appointmentDate: z.string(),
  notifyWhatsapp: z.boolean(),
  notifyWeb: z.boolean(),
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

export function fetchSignedInOwner(): Promise<OwnerProfile> {
  return apiGet("/owner/me", ownerSchema);
}

export function mergeTutor(
  user: AuthUser | null,
  owner: OwnerProfile | undefined,
): AuthUser | null {
  if (!user) return null;
  if (!owner) return user;
  return {
    ...user,
    name: owner.name,
    email: owner.email,
    document: owner.document,
    phoneNumber: owner.telephone || user.phoneNumber,
    pets: owner.pets,
  };
}

export async function fetchTreatmentPlan(petId: string): Promise<TreatmentPlanData> {
  const path = `/owner/${encodeURIComponent(petId)}/plan`;
  const plan = await apiGet(path, planSchema);
  return toTreatmentPlan(plan);
}

export function saveAppointmentNotifications(
  petId: string,
  appointments: Array<{
    id: string;
    notifyWhatsapp: boolean;
    notifyWeb: boolean;
  }>,
): Promise<TreatmentPlanData> {
  const path = `/owner/${encodeURIComponent(petId)}/plan/notifications`;
  return apiSendJson(path, "PATCH", { appointments }, planSchema).then(toTreatmentPlan);
}

function toTreatmentPlan(plan: z.infer<typeof planSchema>): TreatmentPlanData {
  return {
    summary: plan.carePlanDescription,
    items: plan.carePlan.map((item) => ({
      id: item.id,
      appointmentName: item.appointmentName,
      appointmentPrice: item.appointmentPrice,
      appointmentDate: item.appointmentDate,
      notifyWhatsapp: item.notifyWhatsapp,
      notifyWeb: item.notifyWeb,
    })),
  };
}
