import { Button } from "react-aria-components";
import { PetChooser } from "@/components/PetChooser/PetChooser";
import { PetHeader } from "@/components/PetHeader/PetHeader";
import { TreatmentPlan } from "@/components/TreatmentPlan/TreatmentPlan";
import { TutorSummary } from "@/components/TutorSummary/TutorSummary";
import { toPet } from "@/data/owner/owner";
import { isNotFound } from "@/lib/api/api.types";
import type {
  LoadErrorProps,
  HomeTreatmentProps,
  PlanBodyProps,
  StatusMessageProps,
} from "@/pages/HomeTreatment.types";
import { secondaryButtonClass } from "@/styles/controls/controls.constants";

const statusClass = "font-inter text-body text-pretty text-text-primary";

export function HomeTreatment({
  tutor,
  pet,
  pets,
  selectedPetId,
  onSelectPet,
  planQuery,
}: HomeTreatmentProps) {
  if (!pet) {
    return (
      <>
        {tutor ? <TutorSummary tutor={tutor} /> : null}
        <StatusMessage>Nenhum pet encontrado.</StatusMessage>
      </>
    );
  }

  return (
    <>
      {tutor ? <TutorSummary tutor={tutor} /> : null}
      {pets.length > 1 ? (
        <PetChooser pets={pets} selectedPetId={selectedPetId} onSelectPet={onSelectPet} />
      ) : null}
      <PetHeader pet={toPet(pet)} />
      <PlanBody planQuery={planQuery} />
    </>
  );
}

function PlanBody({ planQuery }: PlanBodyProps) {
  if (planQuery.isPending) {
    return <StatusMessage>Carregando plano de tratamento…</StatusMessage>;
  }
  if (isNotFound(planQuery.error)) {
    return <StatusMessage>Este pet ainda não tem plano de tratamento.</StatusMessage>;
  }
  if (planQuery.isError) {
    return <LoadError onRetry={() => void planQuery.refetch()} />;
  }
  if (!planQuery.data) return null;
  return <TreatmentPlan plan={planQuery.data} />;
}

function StatusMessage({ children }: StatusMessageProps) {
  return (
    <p role="status" className={statusClass}>
      {children}
    </p>
  );
}

function LoadError({ onRetry }: LoadErrorProps) {
  return (
    <div className="flex flex-col items-start gap-md">
      <p className={statusClass}>Não foi possível carregar o plano.</p>
      <Button type="button" className={secondaryButtonClass} onPress={onRetry}>
        Tentar de novo
      </Button>
    </div>
  );
}
