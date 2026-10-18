import { LoadError } from "@/components/HomeTreatment/LoadError";
import type { HomeTreatmentProps } from "@/components/HomeTreatment/HomeTreatment.types";
import { OwnerStatus } from "@/components/HomeTreatment/OwnerStatus";
import { PetTabs } from "@/components/HomeTreatment/PetTabs";
import { ProfileSkeleton } from "@/components/Skeleton/Skeleton";
import { TutorSummary } from "@/components/TutorSummary/TutorSummary";
import { ApiError } from "@/lib/api/api.types";
import { showProfileSkeleton } from "@/utils/showProfileSkeleton";

export function HomeTreatment({
  tutor,
  ownerQuery,
  uid,
  petReady,
  pets,
  selectedPetId,
  onSelectPet,
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
  if (pets.length === 0) {
    return <OwnerStatus tutor={tutor} message="Nenhum pet encontrado." />;
  }

  return (
    <>
      {tutor ? <TutorSummary tutor={tutor} /> : null}
      <h3 className="font-inter text-heading-3 text-balance text-text-primary">Seus pets</h3>
      <div className="rounded-md bg-surface-base p-lg shadow-floating md:p-xl">
        <PetTabs pets={pets} selectedPetId={selectedPetId} onSelectPet={onSelectPet} uid={uid} />
      </div>
    </>
  );
}
