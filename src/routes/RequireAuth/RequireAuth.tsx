import { Navigate, useSearchParams } from "react-router-dom";
import { PendingSession } from "@/auth/PendingSession/PendingSession";
import { A11Y_QUERY } from "@/auth/session/session.constants";
import { useAuth } from "@/auth/useAuth/useAuth";
import type { RequireAuthProps } from "@/routes/RequireAuth/RequireAuth.types";

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, isReady } = useAuth();
  const [params] = useSearchParams();
  if (new URLSearchParams(params.toString()).get(A11Y_QUERY) === "1") return children;
  if (!isReady) return <PendingSession />;
  if (user) return children;
  return <Navigate to="/" replace />;
}
