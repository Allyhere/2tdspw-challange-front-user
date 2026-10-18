import { Button } from "react-aria-components";
import { PetChooser } from "@/components/PetChooser/PetChooser";
import { PetHeader } from "@/components/PetHeader/PetHeader";
import { PlanSkeleton, ProfileSkeleton } from "@/components/Skeleton/Skeleton";
import { TreatmentPlan } from "@/components/TreatmentPlan/TreatmentPlan";
import { TutorSummary } from "@/components/TutorSummary/TutorSummary";
import { toPet } from "@/data/owner/owner";
import { ApiError } from "@/lib/api/api.types";
import { showProfileSkeleton } from "@/utils/showProfileSkeleton";
import type {
  LoadErrorProps,
  HomeTreatmentProps,
  OwnerStatusProps,
  PlanBodyProps,
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
  if (ownerQuery.error instanceof ApiError && ownerQuery.error.status === 404 && !ownerQuery.data) {
    return <OwnerStatus tutor={tutor} message="Nenhum pet encontrado." />;
  }
  if ((ownerQuery.isError || ownerQuery.fetchStatus === "paused") && !ownerQuery.data) {
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
  if (planQuery.error instanceof ApiError && planQuery.error.status === 404 && !planQuery.data) {
    return (
      <p role="status" className={statusClass}>
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

function OwnerStatus({ tutor, message }: OwnerStatusProps) {
  return (
    <>
      {tutor ? <TutorSummary tutor={tutor} /> : null}
      <p role="status" className={statusClass}>
        {message}
      </p>
    </>
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
