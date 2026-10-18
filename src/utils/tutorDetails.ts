import { formatCpf } from "@/lib/format/format";
import { formatPhone } from "@/lib/phone/phone";

type TutorContact = {
  email: string;
  phoneNumber: string;
  document: string;
};

export type TutorDetails = {
  email: string;
  phone: string;
  document: string;
};

export function tutorDetails(tutor: TutorContact): TutorDetails {
  return {
    email: tutor.email,
    phone: nationalPhone(tutor.phoneNumber),
    document: tutor.document ? formatCpf(tutor.document) : "",
  };
}

function nationalPhone(phoneNumber: string): string {
  if (!phoneNumber) return "";
  return formatPhone(phoneNumber).replace(/^\+55\s*/, "");
}
