import type { TutorSummaryProps } from "@/components/TutorSummary/TutorSummary.types";
import { tutorDetails } from "@/utils/tutorDetails";

export function TutorSummary({ tutor }: TutorSummaryProps) {
  const details = tutorDetails(tutor);
  return (
    <section
      aria-labelledby={tutor.name ? "tutor-heading" : undefined}
      className="flex flex-col items-center gap-xs text-center"
    >
      {tutor.name ? (
        <h1 id="tutor-heading" className="font-inter text-heading-1 text-balance text-text-primary">
          {tutor.name}
        </h1>
      ) : null}
      {details ? (
        <p className="font-inter text-body text-pretty text-text-primary">{details}</p>
      ) : null}
    </section>
  );
}
