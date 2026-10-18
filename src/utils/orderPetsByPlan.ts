import { ApiError } from "@/lib/api/api.types";

type PlanState = {
  data: unknown;
  error: unknown;
};

export function orderPetsByPlan<T extends { id: string }>(pets: T[], plans: PlanState[]): T[] {
  const missing = missingPlanIds(pets, plans);
  const withPlan = pets.filter((pet) => !missing.has(pet.id));
  const withoutPlan = pets.filter((pet) => missing.has(pet.id));
  return [...withPlan, ...withoutPlan];
}

function missingPlanIds<T extends { id: string }>(pets: T[], plans: PlanState[]): Set<string> {
  const missing = new Set<string>();
  for (const [index, pet] of pets.entries()) {
    if (lacksPlan(plans[index])) missing.add(pet.id);
  }
  return missing;
}

function lacksPlan(plan: PlanState | undefined): boolean {
  if (!plan || plan.data) return false;
  return plan.error instanceof ApiError && plan.error.status === 404;
}
