import { statusClass } from "@/components/HomeTreatment/HomeTreatment.constants";
import type { OwnerStatusProps } from "@/components/HomeTreatment/OwnerStatus.types";
import { TutorSummary } from "@/components/TutorSummary/TutorSummary";

export function OwnerStatus({ tutor, message }: OwnerStatusProps) {
  return (
    <>
      {tutor ? <TutorSummary tutor={tutor} /> : null}
      <p
        role="status"
        className={`${statusClass} rounded-md bg-surface-base p-lg shadow-floating md:p-xl`}
      >
        {message}
      </p>
    </>
  );
}
