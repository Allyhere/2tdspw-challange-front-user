import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/AppHeader";
import { ChatPreview } from "@/components/ChatPreview/ChatPreview";
import { useAuth } from "@/auth/useAuth/useAuth";
import type { TutorPet } from "@/auth/session/session.types";
import { clinicMessages } from "@/data/clinicChat/clinicChat.constants";
import { CARE_PLAN_STALE_TIME } from "@/data/owner/owner.constants";
import { fetchTreatmentPlan } from "@/data/owner/owner";
import { usePageTitle } from "@/lib/usePageTitle";
import { HomeTreatment } from "@/pages/HomeTreatment";

export function HomePage() {
  usePageTitle("Plano de tratamento | Veti");
  const { user, isReady } = useAuth();
  const pets = user?.pets ?? [];
  const selection = usePetSelection(pets);
  const planQuery = useCarePlan(selection.pet?.id, isReady);

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-shell flex-col gap-xl px-lg py-xl">
        <HomeTreatment
          tutor={user}
          pet={selection.pet}
          pets={pets}
          selectedPetId={selection.pet?.id ?? ""}
          onSelectPet={selection.selectPet}
          planQuery={planQuery}
        />
        <ChatPreview messages={clinicMessages} />
      </main>
    </>
  );
}

function usePetSelection(pets: TutorPet[]) {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const pet = pets.find((item) => item.id === selectedId) ?? pets[0];
  return { pet, selectPet: setSelectedId };
}

function useCarePlan(petId: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ["treatment-plan", petId],
    queryFn: () => fetchTreatmentPlan(requiredPetId(petId)),
    enabled: enabled && petId !== undefined,
    staleTime: CARE_PLAN_STALE_TIME,
  });
}

function requiredPetId(petId: string | undefined): string {
  if (!petId) throw new Error("Missing pet");
  return petId;
}
