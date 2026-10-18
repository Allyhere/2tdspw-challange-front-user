import { del } from "idb-keyval";
import { clearNotificationSilence } from "@/lib/persist/notificationSilence";
import { queryClient } from "@/lib/queryClient";
import { queryPersister, sealQueryCache } from "@/lib/persist/queryCache";

export async function clearSignedInCache(uid: string | undefined): Promise<void> {
  sealQueryCache();
  await queryClient.removeQueries({ queryKey: ["owner-profile"] });
  await queryClient.removeQueries({ queryKey: ["treatment-plan"] });
  await queryClient.removeQueries({ queryKey: ["conversations"] });
  await queryClient.removeQueries({ queryKey: ["conversation"] });
  await queryPersister.removeClient();
  await clearNotificationSilence();
  if (!uid) return;
  await del(`selected-pet:${uid}`);
}
