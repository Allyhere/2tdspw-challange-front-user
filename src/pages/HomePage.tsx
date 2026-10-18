import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/useAuth/useAuth";
import { AppHeader } from "@/components/AppHeader";
import { HomeTreatment } from "@/components/HomeTreatment/HomeTreatment";
import { inboxItems } from "@/data/clinicChat/conversation";
import { useInbox } from "@/data/clinicChat/useConversation";
import { fetchSignedInOwner, mergeTutor } from "@/data/owner/owner";
import { offlineQueryOptions } from "@/lib/persist/offlineQuery";
import { usePetSelection } from "@/lib/persist/selectedPet";
import { usePageTitle } from "@/lib/usePageTitle";
import { homePets } from "@/utils/homePets";

export function HomePage() {
  usePageTitle("Plano de tratamento | Veti");
  const { user, isReady } = useAuth();
  const ownerQuery = useOwnerProfile(user?.uid, isReady);
  const tutor = mergeTutor(user, ownerQuery.data);
  const inbox = useInbox(user?.uid);
  const pets = homePets(tutor?.pets ?? [], inboxItems(inbox.data));
  const selection = usePetSelection(user?.uid, pets);

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-dashboard flex-col gap-xl px-lg py-xl">
        <HomeTreatment
          tutor={tutor}
          ownerQuery={ownerQuery}
          uid={user?.uid}
          pet={selection.pet}
          petReady={selection.ready}
          pets={pets}
          selectedPetId={selection.pet?.id ?? ""}
          onSelectPet={selection.selectPet}
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
