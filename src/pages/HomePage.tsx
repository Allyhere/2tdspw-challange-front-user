import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/AppHeader";
import { ClinicInbox } from "@/components/ChatPreview/ChatPreview";
import { useAuth } from "@/auth/useAuth/useAuth";
import {
  fetchSignedInOwner,
  fetchTreatmentPlan,
  mergeTutor,
} from "@/data/owner/owner";
import { offlineQueryOptions } from "@/lib/persist/offlineQuery";
import { usePetSelection } from "@/lib/persist/selectedPet";
import { usePageTitle } from "@/lib/usePageTitle";
import { HomeTreatment } from "@/pages/HomeTreatment";
import { requiredPetId } from "@/utils/requiredPetId";

export function HomePage() {
  usePageTitle("Plano de tratamento | Veti");
  const { user, isReady } = useAuth();
  const ownerQuery = useOwnerProfile(user?.uid, isReady);
  const tutor = mergeTutor(user, ownerQuery.data);
  const pets = tutor?.pets ?? [];
  const selection = usePetSelection(user?.uid, pets);
  const planQuery = useCarePlan(
    user?.uid,
    selection.pet?.id,
    ownerQuery.isSuccess || ownerQuery.data !== undefined,
  );

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-shell flex-col gap-xl px-lg py-xl">
        <ClinicInbox uid={user?.uid} />
        <HomeTreatment
          tutor={tutor}
          ownerQuery={ownerQuery}
          pet={selection.pet}
          petReady={selection.ready}
          pets={pets}
          selectedPetId={selection.pet?.id ?? ""}
          onSelectPet={selection.selectPet}
          planQuery={planQuery}
        />
      </main>
    </>
  );
}

function useOwnerProfile(uid: string | undefined, isReady: boolean) {
  return useQuery({
    queryKey: ["owner-profile", uid],
    queryFn: fetchSignedInOwner,
    enabled: isReady && uid !== undefined,
    ...offlineQueryOptions,
  });
}

function useCarePlan(
  uid: string | undefined,
  petId: string | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["treatment-plan", uid, petId],
    queryFn: () => fetchTreatmentPlan(requiredPetId(petId)),
    enabled: enabled && uid !== undefined && petId !== undefined,
    ...offlineQueryOptions,
  });
}
