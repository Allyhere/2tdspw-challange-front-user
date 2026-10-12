import { Button } from "react-aria-components";
import { PetChooser } from "@/components/PetChooser/PetChooser";
import { PetHeader } from "@/components/PetHeader/PetHeader";
import { PlanSkeleton, ProfileSkeleton } from "@/components/Skeleton/Skeleton";
import { TreatmentPlan } from "@/components/TreatmentPlan/TreatmentPlan";
import { TutorSummary } from "@/components/TutorSummary/TutorSummary";
import { toPet } from "@/data/owner/owner";
import { isNotFound } from "@/lib/api/api.types";
import type {
  LoadErrorProps,
  HomeTreatmentProps,
  OwnerStatusProps,
  PlanBodyProps,
  StatusMessageProps,
} from "@/pages/HomeTreatment.types";
import { secondaryButtonClass } from "@/styles/controls/controls.constants";

const statusClass = "font-inter text-body text-pretty text-text-primary";

export function HomeTreatment({
  tutor,
  ownerQuery,
  pet,
  petReady,
  pets,
  selectedPetId,
  onSelectPet,
  planQuery,
}: HomeTreatmentProps) {
  if (showProfileSkeleton(ownerQuery, petReady)) return <ProfileSkeleton />;
  if (isNotFound(ownerQuery.error) && !ownerQuery.data) {
    return <OwnerStatus tutor={tutor} message="Nenhum pet encontrado." />;
  }
  if (isUnavailable(ownerQuery) && !ownerQuery.data) {
    return (
      <LoadError
        message="Não foi possível carregar seus dados."
        onRetry={() => void ownerQuery.refetch()}
      />
    );
  }
  if (!pet) {
    return <OwnerStatus tutor={tutor} message="Nenhum pet encontrado." />;
  }

  return (
    <>
      {tutor ? <TutorSummary tutor={tutor} /> : null}
      {pets.length > 1 ? (
        <PetChooser pets={pets} selectedPetId={selectedPetId} onSelectPet={onSelectPet} />
      ) : null}
      <PetHeader pet={toPet(pet)} />
      <PlanBody planQuery={planQuery} />
    </>
  );
}

function PlanBody({ planQuery }: PlanBodyProps) {
  if (planQuery.isLoading && !planQuery.data) return <PlanSkeleton />;
  if (isNotFound(planQuery.error) && !planQuery.data) {
    return <StatusMessage>Este pet ainda não tem plano de tratamento.</StatusMessage>;
  }
  if (isUnavailable(planQuery) && !planQuery.data) {
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

function showProfileSkeleton(
  ownerQuery: { isLoading: boolean; data: unknown },
  petReady: boolean,
): boolean {
  if (ownerQuery.isLoading && !ownerQuery.data) return true;
  return !petReady && ownerQuery.data !== undefined;
}

function isUnavailable(query: { isError: boolean; fetchStatus: string }): boolean {
  return query.isError || query.fetchStatus === "paused";
}

function OwnerStatus({ tutor, message }: OwnerStatusProps) {
  return (
    <>
      {tutor ? <TutorSummary tutor={tutor} /> : null}
      <StatusMessage>{message}</StatusMessage>
    </>
  );
}

function StatusMessage({ children }: StatusMessageProps) {
  return (
    <p role="status" className={statusClass}>
      {children}
    </p>
  );
}

function LoadError({ message, onRetry }: LoadErrorProps) {
  return (
    <div className="flex flex-col items-start gap-md">
      <p className={statusClass}>{message}</p>
      <Button type="button" className={secondaryButtonClass} onPress={onRetry}>
        Tentar de novo
      </Button>
    </div>
  );
}
