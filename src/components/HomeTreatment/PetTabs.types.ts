import type { HomePet } from "@/utils/homePets";

export type PetTabsProps = {
  pets: HomePet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
  uid: string | undefined;
};

export type PetPanelProps = {
  pet: HomePet;
  uid: string | undefined;
};
