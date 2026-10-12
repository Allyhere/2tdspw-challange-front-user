import { formatCpf } from "@/lib/format/format";
import { formatPhone } from "@/lib/phone/phone";

type TutorContact = {
  email: string;
  phoneNumber: string;
  document: string;
};

export function tutorDetails(tutor: TutorContact): string {
  const phone = tutor.phoneNumber ? formatPhone(tutor.phoneNumber) : "";
  return [tutor.email, phone, formatCpf(tutor.document)]
    .filter((part) => part.length > 0)
    .join(" · ");
}
