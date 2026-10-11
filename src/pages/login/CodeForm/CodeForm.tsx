import { useState, type FormEvent } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import type { AuthUser } from "@/auth/session/session.types";
import { formatPhone, parseOtp } from "@/lib/phone/phone";
import type { CodeFieldProps, CodeFormProps } from "@/pages/login/CodeForm/CodeForm.types";
import {
  errorClass,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/styles/controls/controls.constants";

export function CodeForm({
  confirmation,
  phoneNumber,
  onBack,
  onSuccess,
}: CodeFormProps) {
  const [code, setCode] = useState("");
  const [serverError, setServerError] = useState("");
  const [pending, setPending] = useState(false);

  function handleCodeChange(value: string) {
    setCode(value);
    setServerError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const otp = parseOtp(code);
    if (!otp) return;
    await submitCode(confirmation, otp, setServerError, setPending, onSuccess);
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationErrors={serverError ? { otp: serverError } : undefined}
      className="flex flex-col gap-md"
    >
      <p className="font-roboto text-body text-pretty text-text-primary">
        Digite o código enviado para {formatPhone(phoneNumber)}.
      </p>
      <CodeField code={code} onChange={handleCodeChange} />
      <Button type="submit" className={primaryButtonClass} isDisabled={pending}>
        Confirmar código
      </Button>
      <Button
        type="button"
        className={secondaryButtonClass}
        onPress={onBack}
        isDisabled={pending}
      >
        Alterar número
      </Button>
    </Form>
  );
}

function CodeField({ code, onChange }: CodeFieldProps) {
  return (
    <TextField
      name="otp"
      value={code}
      onChange={onChange}
      isRequired
      validationBehavior="aria"
      validate={validateOtp}
      className="flex flex-col gap-xs"
    >
      <Label className={labelClass}>Código</Label>
      <Input
        className={inputClass}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
      />
      <FieldError className={errorClass} />
    </TextField>
  );
}

function validateOtp(value: string): string | null {
  if (parseOtp(value)) return null;
  return "Informe os 6 dígitos do código.";
}

async function submitCode(
  confirmation: PhoneConfirmation,
  otp: string,
  setServerError: (message: string) => void,
  setPending: (pending: boolean) => void,
  onSuccess: (user: AuthUser) => void,
) {
  setServerError("");
  setPending(true);
  try {
    onSuccess(await confirmation.confirm(otp));
  } catch {
    setServerError("Não foi possível validar o código.");
    setPending(false);
  }
}
