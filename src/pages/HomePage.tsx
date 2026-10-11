import { AppHeader } from "@/components/AppHeader";
import { ChatPreview } from "@/components/ChatPreview/ChatPreview";
import { PetHeader } from "@/components/PetHeader/PetHeader";
import { TreatmentPlan } from "@/components/TreatmentPlan/TreatmentPlan";
import { clinicMessages } from "@/data/clinicChat/clinicChat.constants";
import { pet, treatmentPlan } from "@/data/treatment/treatment.constants";
import { usePageTitle } from "@/lib/usePageTitle";

export function HomePage() {
  usePageTitle("Plano de tratamento | Veti");

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-shell flex-col gap-xl px-lg py-xl">
        <PetHeader pet={pet} />
        <TreatmentPlan plan={treatmentPlan} />
        <ChatPreview messages={clinicMessages} />
      </main>
    </>
  );
}
