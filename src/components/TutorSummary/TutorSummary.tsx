import type { TutorSummaryProps } from "@/components/TutorSummary/TutorSummary.types";
import { nameInitials } from "@/utils/nameInitials";
import { tutorDetails } from "@/utils/tutorDetails";

export function TutorSummary({ tutor }: TutorSummaryProps) {
  const details = tutorDetails(tutor);
  const mark = tutor.name ? nameInitials(tutor.name) : "";

  return (
    <section
      aria-labelledby={tutor.name ? "tutor-heading" : undefined}
      className="flex items-center gap-lg"
    >
      {mark ? (
        <span
          aria-hidden="true"
          className="grid size-avatar shrink-0 place-items-center rounded-full bg-primary font-inter text-heading-2 text-primary-light"
        >
          {mark}
        </span>
      ) : null}
      <div className="min-w-0">
        {tutor.name ? (
          <h1
            id="tutor-heading"
            className="font-inter text-heading-1 text-balance text-text-primary"
          >
            {tutor.name}
          </h1>
        ) : null}
        {details ? (
          <p className="font-roboto text-body text-pretty text-text-primary">{details}</p>
        ) : null}
      </div>
    </section>
  );
}
