import { Navigate, useSearchParams } from "react-router-dom";
import { isA11yPreview } from "@/auth/session/session";
import { useAuth } from "@/auth/useAuth/useAuth";
import type { RequireAuthProps } from "@/routes/RequireAuth/RequireAuth.types";

export function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useAuth();
  const [params] = useSearchParams();
  if (user || isA11yPreview(params.toString())) return children;
  return <Navigate to="/" replace />;
}
