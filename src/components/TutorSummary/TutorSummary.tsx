import type { TutorSummaryProps } from "@/components/TutorSummary/TutorSummary.types";
import { formatCpf } from "@/lib/format/format";
import { formatPhone } from "@/lib/phone/phone";

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

function tutorDetails(tutor: TutorSummaryProps["tutor"]): string {
  const phone = tutor.phoneNumber ? formatPhone(tutor.phoneNumber) : "";
  return [tutor.email, phone, formatCpf(tutor.document)]
    .filter((part) => part.length > 0)
    .join(" · ");
}
