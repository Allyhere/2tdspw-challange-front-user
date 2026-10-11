import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import type { RecaptchaVerifier } from "firebase/auth";
import { sendPhoneCode } from "@/auth/phoneAuth/phoneAuth";
import { PHONE_AUTH_ERROR_FALLBACK } from "@/auth/phoneAuth/phoneAuth.constants";
import { phoneAuthErrorMessage } from "@/auth/phoneAuth/phoneAuthError";
import {
  createPhoneVerifier,
  resetPhoneVerifier,
} from "@/auth/phoneAuth/phoneVerifier";
import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import type { PhoneFieldProps, PhoneFormProps } from "@/pages/login/PhoneForm/PhoneForm.types";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { normalizePhone } from "@/lib/phone/phone";
import {
  errorClass,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "@/styles/controls/controls.constants";

const SEND_CODE_BUTTON_ID = "send-code";
const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

export function PhoneForm({ onCodeSent }: PhoneFormProps) {
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");
  const verifierRef = usePhoneVerifier();

  function handlePhoneChange(value: string) {
    setPhone(value);
    setServerError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitPhone(
      phone,
      verifierRef.current,
      setPending,
      setServerError,
      onCodeSent,
    );
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationErrors={serverError ? { phone: serverError } : undefined}
      className="flex flex-col gap-md"
    >
      <PhoneField phone={phone} onChange={handlePhoneChange} />
      <div id={RECAPTCHA_CONTAINER_ID} />
      <Button
        id={SEND_CODE_BUTTON_ID}
        type="submit"
        className={primaryButtonClass}
        isDisabled={pending}
      >
        Enviar código
      </Button>
    </Form>
  );
}

function usePhoneVerifier(): RefObject<RecaptchaVerifier | null> {
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    const container = document.getElementById(RECAPTCHA_CONTAINER_ID);
    if (!container) return;
    const verifier = createPhoneVerifier(getFirebaseAuth(), container);
    verifierRef.current = verifier;
    return () => {
      verifier.clear();
      verifierRef.current = null;
    };
  }, []);

  return verifierRef;
}

async function submitPhone(
  phone: string,
  verifier: RecaptchaVerifier | null,
  setPending: (pending: boolean) => void,
  setServerError: (message: string) => void,
  onCodeSent: (confirmation: PhoneConfirmation, phoneNumber: string) => void,
) {
  const phoneNumber = normalizePhone(phone);
  if (!phoneNumber) return;
  if (!verifier) {
    setServerError(PHONE_AUTH_ERROR_FALLBACK);
    return;
  }
  setServerError("");
  setPending(true);
  try {
    onCodeSent(await sendPhoneCode(phoneNumber, verifier), phoneNumber);
  } catch (error) {
    setServerError(phoneAuthErrorMessage(error));
    setPending(false);
    await resetPhoneVerifier(verifier).catch(() => undefined);
  }
}

function PhoneField({ phone, onChange }: PhoneFieldProps) {
  return (
    <TextField
      name="phone"
      type="tel"
      value={phone}
      onChange={onChange}
      isRequired
      validate={validatePhone}
      className="flex flex-col gap-xs"
    >
      <Label className={labelClass}>Celular</Label>
      <Input className={inputClass} autoComplete="tel" inputMode="tel" />
      <FieldError className={errorClass} />
    </TextField>
  );
}

function validatePhone(value: string): string | null {
  if (normalizePhone(value)) return null;
  return "Informe um celular válido com DDD.";
}
