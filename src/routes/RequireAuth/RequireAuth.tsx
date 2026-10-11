import { Navigate, useSearchParams } from "react-router-dom";
import { PendingSession } from "@/auth/PendingSession/PendingSession";
import { isA11yPreview } from "@/auth/session/session";
import { useAuth } from "@/auth/useAuth/useAuth";
import type { RequireAuthProps } from "@/routes/RequireAuth/RequireAuth.types";

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, isReady } = useAuth();
  const [params] = useSearchParams();
  if (isA11yPreview(params.toString())) return children;
  if (!isReady) return <PendingSession />;
  if (user) return children;
  return <Navigate to="/" replace />;
}
