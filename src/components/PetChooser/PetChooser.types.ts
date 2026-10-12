import type { TutorPet } from "@/auth/session/session.types";

export type PetChooserProps = {
  pets: TutorPet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
};
