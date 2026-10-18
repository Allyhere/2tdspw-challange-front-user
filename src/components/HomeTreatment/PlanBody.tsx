import { LoadError } from "@/components/HomeTreatment/LoadError";
import type { PlanBodyProps } from "@/components/HomeTreatment/PlanBody.types";
import { PlanSkeleton } from "@/components/Skeleton/Skeleton";
import { TreatmentPlan } from "@/components/TreatmentPlan/TreatmentPlan";
import { ApiError } from "@/lib/api/api.types";

export function PlanBody({ planQuery }: PlanBodyProps) {
  if (planQuery.isLoading && !planQuery.data) return <PlanSkeleton />;
  if (planQuery.error instanceof ApiError && planQuery.error.status === 404 && !planQuery.data) {
    return (
      <p role="status" className="font-inter text-body text-pretty text-text-primary">
        Este pet ainda não tem plano de tratamento.
      </p>
    );
  }
  if ((planQuery.isError || planQuery.fetchStatus === "paused") && !planQuery.data) {
    return (
      <LoadError
        message="Não foi possível carregar o plano."
        onRetry={() => void planQuery.refetch()}
      />
    );
  }
  if (!planQuery.data) return null;
  return <TreatmentPlan plan={planQuery.data} />;
}
