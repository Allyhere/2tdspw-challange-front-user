import { useState, type FormEvent } from "react";
import { Button, Form } from "react-aria-components";
import { phoneAuthErrorMessage } from "@/auth/phoneAuth/phoneAuthError";
import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import type { AuthUser } from "@/auth/session/session.types";
import { formatPhone, parseOtp } from "@/lib/phone/phone";
import type { CodeFormProps } from "@/pages/login/CodeForm/CodeForm.types";
import { OtpField } from "@/pages/login/CodeForm/OtpField";

export function CodeForm({
  confirmation,
  phoneNumber,
  onBack,
  onSuccess,
}: CodeFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function handleCodeChange(value: string) {
    setCode(value);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const otp = parseOtp(code);
    if (!otp) {
      setError("Informe os 6 dígitos do código.");
      return;
    }
    await submitCode(confirmation, otp, setError, setPending, onSuccess);
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-md">
      <p className="font-roboto text-body text-pretty text-text-primary">
        Digite o código enviado para {formatPhone(phoneNumber)}.
      </p>
      <OtpField
        code={code}
        error={error}
        isDisabled={pending}
        onChange={handleCodeChange}
      />
      <Button type="submit" className="inline-flex min-h-touch w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary p-lg font-roboto text-button-lg text-primary-light outline-none transition-press data-hovered:border-primary-dark data-hovered:bg-primary-dark data-pressed:scale-press data-pressed:border-primary-dark data-pressed:bg-primary-dark data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-not-allowed data-disabled:opacity-60" isDisabled={pending}>
        Confirmar código
      </Button>
      <Button
        type="button"
        className="inline-flex min-h-touch cursor-pointer items-center justify-center rounded-md border border-border-divider bg-surface-base p-lg font-roboto text-button-lg text-text-primary outline-none transition-press data-hovered:bg-surface-alt data-pressed:scale-press data-pressed:bg-primary-light data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-not-allowed data-disabled:opacity-60"
        onPress={onBack}
        isDisabled={pending}
      >
        Alterar número
      </Button>
    </Form>
  );
}

async function submitCode(
  confirmation: PhoneConfirmation,
  otp: string,
  setError: (message: string) => void,
  setPending: (pending: boolean) => void,
  onSuccess: (user: AuthUser) => void,
) {
  setError("");
  setPending(true);
  try {
    onSuccess(await confirmation.confirm(otp));
  } catch (caught) {
    setError(phoneAuthErrorMessage(caught));
    setPending(false);
  }
}
