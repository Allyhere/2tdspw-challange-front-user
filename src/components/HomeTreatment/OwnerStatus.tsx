import type { OwnerStatusProps } from "@/components/HomeTreatment/OwnerStatus.types";
import { TutorSummary } from "@/components/TutorSummary/TutorSummary";

export function OwnerStatus({ tutor, message }: OwnerStatusProps) {
  return (
    <>
      {tutor ? <TutorSummary tutor={tutor} /> : null}
      <p
        role="status"
        className="rounded-md bg-surface-base p-lg font-inter text-body text-pretty text-text-primary shadow-floating md:p-xl"
      >
        {message}
      </p>
    </>
  );
}
