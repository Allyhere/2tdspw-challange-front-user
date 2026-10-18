import { LoadError } from "@/components/HomeTreatment/LoadError";
import type { HomeTreatmentProps } from "@/components/HomeTreatment/HomeTreatment.types";
import { OwnerStatus } from "@/components/HomeTreatment/OwnerStatus";
import { PlanBody } from "@/components/HomeTreatment/PlanBody";
import { PetChooser } from "@/components/PetChooser/PetChooser";
import { PetHeader } from "@/components/PetHeader/PetHeader";
import { ProfileSkeleton } from "@/components/Skeleton/Skeleton";
import { TutorSummary } from "@/components/TutorSummary/TutorSummary";
import { toPet } from "@/data/owner/owner";
import { ApiError } from "@/lib/api/api.types";
import { showProfileSkeleton } from "@/utils/showProfileSkeleton";

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
