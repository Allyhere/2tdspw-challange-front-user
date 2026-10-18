import { cn } from "@/utils/cn";
import { Show } from "@/components/Show/Show";
import type { TutorSummaryProps } from "@/components/TutorSummary/TutorSummary.types";
import { TutorSummaryStates } from "@/components/TutorSummary/TutorSummaryStates";
import { tutorDetails } from "@/utils/tutorDetails";

export function TutorSummary({ tutor, className }: TutorSummaryProps) {
  const details = tutorDetails(tutor);
  const hasDetails = Boolean(details.email || details.phone || details.document);

  return (
    <section
      aria-labelledby={tutor.name ? "tutor-heading" : undefined}
      className={cn("flex items-center gap-lg", className)}
    >
      <div className="min-w-0">
        <Show.When when={tutor.name || false}>
          {(name) => <TutorSummaryStates.Name name={name} />}
        </Show.When>
        <Show.When when={hasDetails}>
          <TutorSummaryStates.Details
            email={details.email}
            phone={details.phone}
            document={details.document}
          />
        </Show.When>
      </div>
    </section>
  );
}
