import type { UseQueryResult } from "@tanstack/react-query";
import type { AuthUser, TutorPet } from "@/auth/session/session.types";
import type { TreatmentPlanData } from "@/data/treatment/treatment.types";

export type HomeTreatmentProps = {
  tutor: AuthUser | null;
  pet: TutorPet | undefined;
  pets: TutorPet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
  planQuery: UseQueryResult<TreatmentPlanData>;
};

export type PlanBodyProps = {
  planQuery: UseQueryResult<TreatmentPlanData>;
};

export type StatusMessageProps = {
  children: string;
};

export type LoadErrorProps = {
  onRetry: () => void;
};
