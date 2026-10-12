export function showProfileSkeleton(
  ownerQuery: { isLoading: boolean; data: unknown },
  petReady: boolean,
): boolean {
  if (ownerQuery.isLoading && !ownerQuery.data) return true;
  return !petReady && ownerQuery.data !== undefined;
}
