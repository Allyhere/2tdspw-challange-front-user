import { useQueries } from "@tanstack/react-query";
import { fetchTreatmentPlan } from "@/data/owner/owner";
import { offlineQueryOptions } from "@/lib/persist/offlineQuery";
import type { HomePet } from "@/utils/homePets";
import { orderPetsByPlan } from "@/utils/orderPetsByPlan";

export function usePetsByPlan(uid: string | undefined, pets: HomePet[]): HomePet[] {
  const plans = useQueries({
    queries: pets.map((pet) => ({
      queryKey: ["treatment-plan", uid, pet.id],
      queryFn: () => fetchTreatmentPlan(pet.id),
      enabled: uid !== undefined,
      ...offlineQueryOptions,
    })),
  });
  return orderPetsByPlan(pets, plans);
}
