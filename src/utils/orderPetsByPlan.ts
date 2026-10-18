import { ApiError } from "@/lib/api/api.types";

type PlanState = {
  data: unknown;
  error: unknown;
};

export function orderPetsByPlan<T extends { id: string }>(
  pets: T[],
  plans: PlanState[],
  knownMissing: ReadonlySet<string>,
): T[] {
  const missing = missingPlanIds(pets, plans, knownMissing);
  const withPlan = pets.filter((pet) => !missing.has(pet.id));
  const withoutPlan = pets.filter((pet) => missing.has(pet.id));
  return [...withPlan, ...withoutPlan];
}

export function rememberMissingPlans(
  pets: { id: string }[],
  plans: PlanState[],
  current: ReadonlySet<string>,
): ReadonlySet<string> {
  const next = new Set(current);
  let changed = false;
  for (const [index, pet] of pets.entries()) {
    if (notePlan(next, pet.id, plans[index])) changed = true;
  }
  return changed ? next : current;
}

function missingPlanIds<T extends { id: string }>(
  pets: T[],
  plans: PlanState[],
  knownMissing: ReadonlySet<string>,
): Set<string> {
  const missing = new Set<string>();
  for (const [index, pet] of pets.entries()) {
    if (lacksPlan(plans[index], knownMissing.has(pet.id))) missing.add(pet.id);
  }
  return missing;
}

function notePlan(ids: Set<string>, petId: string, plan: PlanState | undefined): boolean {
  if (plan?.data) return ids.delete(petId);
  if (!isMissingPlan(plan?.error) || ids.has(petId)) return false;
  ids.add(petId);
  return true;
}

function lacksPlan(plan: PlanState | undefined, knownMissing: boolean): boolean {
  if (plan?.data) return false;
  if (isMissingPlan(plan?.error)) return true;
  return knownMissing;
}

function isMissingPlan(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}
