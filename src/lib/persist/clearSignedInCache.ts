import { queryClient } from "@/lib/queryClient";
import { clearSelectedPetId } from "@/lib/persist/selectedPet";
import { queryPersister, sealQueryCache } from "@/lib/persist/queryCache";

export async function clearSignedInCache(uid: string | undefined): Promise<void> {
  sealQueryCache();
  await queryClient.removeQueries({ queryKey: ["owner-profile"] });
  await queryClient.removeQueries({ queryKey: ["treatment-plan"] });
  await queryPersister.removeClient();
  if (!uid) return;
  await clearSelectedPetId(uid);
}
