import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";

export type PhoneFormProps = {
  onCodeSent: (confirmation: PhoneConfirmation, phoneNumber: string) => void;
};

export type PhoneFieldProps = {
  phone: string;
  onChange: (value: string) => void;
};
