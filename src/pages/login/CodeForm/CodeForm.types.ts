import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import type { AuthUser } from "@/auth/session/session.types";

export type CodeFormProps = {
  confirmation: PhoneConfirmation;
  phoneNumber: string;
  onBack: () => void;
  onSuccess: (user: AuthUser) => void;
};

export type CodeFieldProps = {
  code: string;
  onChange: (value: string) => void;
};
