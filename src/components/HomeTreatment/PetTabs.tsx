import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "react-aria-components";
import { ClinicInbox } from "@/components/ChatPreview/ChatPreview";
import type { PetPanelProps, PetTabsProps } from "@/components/HomeTreatment/PetTabs.types";
import { PlanBody } from "@/components/HomeTreatment/PlanBody";
import { PetHeader } from "@/components/PetHeader/PetHeader";
import { Show } from "@/components/Show/Show";
import { fetchTreatmentPlan, toPet } from "@/data/owner/owner";
import type { HomePet } from "@/utils/homePets";
import { formatKilograms } from "@/utils/formatKilograms";
import { useEasedHeight } from "@/hooks/useEasedHeight";
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
      <TabList
        aria-label="Pets"
        className="flex w-full gap-xs overflow-x-auto rounded-md bg-surface-alt p-sm shadow-hairline"
      >
        {pets.map((pet) => (
          <Tab
            key={pet.id}
            id={pet.id}
            className="inline-flex min-h-touch min-w-24 flex-1 cursor-pointer items-center justify-center rounded-md px-lg font-roboto text-label whitespace-nowrap text-text-primary outline-none transition-tab not-data-selected:data-hovered:bg-surface-base data-selected:bg-primary data-selected:text-primary-light data-selected:shadow-subtle data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
          >
            {pet.name}
          </Tab>
        ))}
      </TabList>
      <EasedPanels>
        <TabPanels>
          {pets.map((pet) => (
            <TabPanel key={pet.id} id={pet.id} className="flex flex-col gap-xl">
              <PetPanel pet={pet} uid={uid} />
            </TabPanel>
          ))}
        </TabPanels>
      </EasedPanels>
    </Tabs>
  );
}

function EasedPanels({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { height, ready } = useEasedHeight(ref);
  return (
    <motion.div className={ready ? "overflow-hidden" : undefined} style={ready ? { height } : undefined}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

function PetPanel({ pet, uid }: PetPanelProps) {
  const planQuery = useCarePlan(uid, pet.id);
  return (
    <>
      <PetIntro pet={pet} />
      <div className="grid items-start gap-xl md:grid-cols-2 *:min-w-0">
        <PlanBody planQuery={planQuery} />
        <ClinicInbox uid={uid} petId={pet.id} />
      </div>
    </>
  );
}

function PetIntro({ pet }: { pet: HomePet }) {
  if (pet.profile) return <PetHeader pet={toPet(pet.profile)} />;
  const weight = pet.weight === null ? null : formatKilograms(pet.weight);
  const details = [weight, pet.age === null ? null : `${pet.age} anos`].filter(
    (part): part is string => part !== null,
  );
  return (
    <header className="flex flex-col items-start gap-xs">
      <h2 className="font-inter text-heading-1 text-balance text-text-primary">
        {pet.breed ? `${pet.name} (${pet.breed})` : pet.name}
      </h2>
      <Show.When when={details.length > 0 ? details : false}>
        {(parts) => (
          <p className="font-inter text-subtitle text-pretty text-text-primary tabular-nums">
            {parts.join(" · ")}
          </p>
        )}
      </Show.When>
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
