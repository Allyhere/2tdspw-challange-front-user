import type { UseQueryResult } from "@tanstack/react-query";
import type { AuthUser } from "@/auth/session/session.types";
import type { OwnerProfile } from "@/data/owner/owner";
import type { HomePet } from "@/utils/homePets";

export type HomeTreatmentProps = {
  tutor: AuthUser | null;
  ownerQuery: UseQueryResult<OwnerProfile>;
  uid: string | undefined;
  petReady: boolean;
  pets: HomePet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
};
