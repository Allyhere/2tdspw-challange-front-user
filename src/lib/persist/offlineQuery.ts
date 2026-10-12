import { CARE_PLAN_STALE_TIME } from "@/data/owner/owner.constants";
import { QUERY_CACHE_MAX_AGE } from "@/lib/persist/queryCache";

export const offlineQueryOptions = {
  staleTime: CARE_PLAN_STALE_TIME,
  gcTime: QUERY_CACHE_MAX_AGE,
  networkMode: "offlineFirst",
} as const;
