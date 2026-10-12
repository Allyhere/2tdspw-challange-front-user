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

export type OwnerStatusProps = {
  tutor: AuthUser | null;
  message: string;
};

export type PlanBodyProps = {
  planQuery: UseQueryResult<TreatmentPlanData>;
};

export type StatusMessageProps = {
  children: string;
};

export type LoadErrorProps = {
  message: string;
  onRetry: () => void;
};
