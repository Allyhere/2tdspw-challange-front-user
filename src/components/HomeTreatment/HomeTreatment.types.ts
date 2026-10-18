import type { UseQueryResult } from "@tanstack/react-query";
import type { AuthUser, TutorPet } from "@/auth/session/session.types";
import type { OwnerProfile } from "@/data/owner/owner";
import type { TreatmentPlanData } from "@/data/treatment/treatment.types";

export type HomeTreatmentProps = {
  tutor: AuthUser | null;
  ownerQuery: UseQueryResult<OwnerProfile>;
  pet: TutorPet | undefined;
  petReady: boolean;
  pets: TutorPet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
  planQuery: UseQueryResult<TreatmentPlanData>;
};
