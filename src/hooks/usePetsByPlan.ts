import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchTreatmentPlan } from "@/data/owner/owner";
import { offlineQueryOptions } from "@/lib/persist/offlineQuery";
import type { HomePet } from "@/utils/homePets";
import { orderPetsByPlan, rememberMissingPlans } from "@/utils/orderPetsByPlan";

export function usePetsByPlan(uid: string | undefined, pets: HomePet[]): HomePet[] {
  const plans = useQueries({
    queries: pets.map((pet) => ({
      queryKey: ["treatment-plan", uid, pet.id],
      queryFn: () => fetchTreatmentPlan(pet.id),
      enabled: uid !== undefined,
      ...offlineQueryOptions,
    })),
  });
  const missing = useMissingPlans(uid, pets, plans);
  return orderPetsByPlan(pets, plans, missing);
}

function useMissingPlans(
  uid: string | undefined,
  pets: HomePet[],
  plans: { data: unknown; error: unknown }[],
): ReadonlySet<string> {
  const [memory, setMemory] = useState<MissingPlans>(() => ({ uid, ids: new Set() }));
  const ids = rememberMissingPlans(pets, plans, memory.uid === uid ? memory.ids : new Set());
  if (memory.uid !== uid || memory.ids !== ids) setMemory({ uid, ids });
  return ids;
}

type MissingPlans = {
  uid: string | undefined;
  ids: ReadonlySet<string>;
};
