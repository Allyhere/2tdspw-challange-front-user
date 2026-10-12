import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/api.types";
import { QUERY_CACHE_MAX_AGE } from "@/lib/persist/queryCache";

const FIVE_MINUTES = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES,
      gcTime: QUERY_CACHE_MAX_AGE,
      retry: shouldRetry,
    },
  },
});

function shouldRetry(failureCount: number, error: Error): boolean {
  if (error instanceof ApiError && error.status === 404) return false;
  return failureCount < 2;
}
