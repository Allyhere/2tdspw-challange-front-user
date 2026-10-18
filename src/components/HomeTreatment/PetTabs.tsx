import { useQuery } from "@tanstack/react-query";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "react-aria-components";
import { ClinicInbox } from "@/components/ChatPreview/ChatPreview";
import { panelClass, tabClass, tabListClass } from "@/components/HomeTreatment/PetTabs.constants";
import type { PetPanelProps, PetTabsProps } from "@/components/HomeTreatment/PetTabs.types";
import { PlanBody } from "@/components/HomeTreatment/PlanBody";
import { PetHeader } from "@/components/PetHeader/PetHeader";
import { fetchTreatmentPlan, toPet } from "@/data/owner/owner";
import type { HomePet } from "@/utils/homePets";
import { offlineQueryOptions } from "@/lib/persist/offlineQuery";

export function PetTabs({ pets, selectedPetId, onSelectPet, uid }: PetTabsProps) {
  return (
    <Tabs
      selectedKey={selectedPetId}
      onSelectionChange={(key) => {
        if (typeof key === "string") onSelectPet(key);
      }}
      className="flex flex-col gap-lg"
    >
      <TabList aria-label="Pets" className={tabListClass}>
        {pets.map((pet) => (
          <Tab key={pet.id} id={pet.id} className={tabClass}>
            {pet.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {pets.map((pet) => (
          <TabPanel key={pet.id} id={pet.id} className={panelClass}>
            <PetPanel pet={pet} uid={uid} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

function PetPanel({ pet, uid }: PetPanelProps) {
  const planQuery = useCarePlan(uid, pet.id);
  return (
    <>
      <PetIntro pet={pet} />
      <PlanBody planQuery={planQuery} />
      <ClinicInbox uid={uid} petId={pet.id} />
    </>
  );
}

function PetIntro({ pet }: { pet: HomePet }) {
  if (pet.profile) return <PetHeader pet={toPet(pet.profile)} />;
  const weight =
    pet.weight === null
      ? null
      : `${new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(pet.weight)} kg`;
  const details = [weight, pet.age === null ? null : `${pet.age} anos`].filter((part) => part !== null);
  return (
    <header className="flex flex-col items-center gap-xs text-center">
      <h2 className="font-inter text-heading-1 text-balance text-text-primary">
        {pet.breed ? `${pet.name} (${pet.breed})` : pet.name}
      </h2>
      {details.length > 0 ? (
        <p className="font-inter text-subtitle text-text-primary">{details.join(" · ")}</p>
      ) : null}
    </header>
  );
}

function useCarePlan(uid: string | undefined, petId: string) {
  return useQuery({
    queryKey: ["treatment-plan", uid, petId],
    queryFn: () => fetchTreatmentPlan(petId),
    enabled: uid !== undefined,
    ...offlineQueryOptions,
  });
}
