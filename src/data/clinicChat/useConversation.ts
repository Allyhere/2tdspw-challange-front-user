import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchConversation, fetchInbox } from "@/data/clinicChat/conversation";
import { useVisibleInterval } from "@/hooks/useVisibleInterval";

const REFRESH_MS = 20_000;

export function useInbox(uid: string | undefined) {
  const interval = useVisibleInterval(REFRESH_MS);
  return useInfiniteQuery({
    queryKey: ["conversations", uid],
    queryFn: ({ pageParam }) => fetchInbox(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (page) => page.nextCursor ?? undefined,
    enabled: uid !== undefined,
    refetchInterval: interval,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

export function useThread(uid: string | undefined, conversationId: string | undefined) {
  const interval = useVisibleInterval(REFRESH_MS);
  return useQuery({
    queryKey: ["conversation", uid, conversationId],
    queryFn: () => fetchConversation(requiredConversationId(conversationId)),
    enabled: uid !== undefined && conversationId !== undefined,
    refetchInterval: interval,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

function requiredConversationId(conversationId: string | undefined): string {
  if (!conversationId) throw new Error("Missing conversation id");
  return conversationId;
}
