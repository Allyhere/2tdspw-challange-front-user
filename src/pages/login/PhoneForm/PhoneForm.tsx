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

const SEND_CODE_BUTTON_ID = "send-code";

export function PhoneForm({ onCodeSent }: PhoneFormProps) {
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");
  const phoneRef = useRef(phone);
  const sendLockRef = useRef(false);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  function sendCode() {
    void submitPhone(
      phoneRef.current,
      verifierRef.current,
      sendLockRef,
      setPending,
      setServerError,
      onCodeSent,
    );
  }

  const submitBeforeWidget = usePhoneVerifier(verifierRef, sendCode);

  function handlePhoneChange(value: string) {
    phoneRef.current = value;
    setPhone(value);
    setServerError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitBeforeWidget();
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationErrors={serverError ? { phone: serverError } : undefined}
      className="flex flex-col gap-md"
    >
      <PhoneField phone={phone} onChange={handlePhoneChange} />
      <Button
        id={SEND_CODE_BUTTON_ID}
        type="submit"
        className="inline-flex min-h-touch w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary p-lg font-roboto text-button-lg text-primary-light outline-none transition-press data-hovered:border-primary-dark data-hovered:bg-primary-dark data-pressed:scale-press data-pressed:border-primary-dark data-pressed:bg-primary-dark data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-not-allowed data-disabled:opacity-60"
        isDisabled={pending}
      >
        Enviar código
      </Button>
    </Form>
  );
}

function usePhoneVerifier(
  verifierRef: RefObject<RecaptchaVerifier | null>,
  onSolved: () => void,
): () => void {
  const onSolvedRef = useRef(onSolved);
  const widgetReadyRef = useRef(false);

  useEffect(() => {
    onSolvedRef.current = onSolved;
  }, [onSolved]);

  useEffect(
    () => mountPhoneVerifier(verifierRef, onSolvedRef, widgetReadyRef),
    [verifierRef],
  );

  return () => {
    if (widgetReadyRef.current) return;
    onSolvedRef.current();
  };
}

function mountPhoneVerifier(
  verifierRef: RefObject<RecaptchaVerifier | null>,
  onSolvedRef: RefObject<() => void>,
  widgetReadyRef: RefObject<boolean>,
): () => void {
  if (!isFirebaseConfigured()) return () => undefined;
  const button = document.getElementById(SEND_CODE_BUTTON_ID);
  if (!(button instanceof HTMLButtonElement)) return () => undefined;
  const verifier = createPhoneVerifier(getFirebaseAuth(), button, () => {
    onSolvedRef.current();
  });
  verifierRef.current = verifier;
  let active = true;
  void verifier.render().then(() => {
    if (active) widgetReadyRef.current = true;
  }).catch(() => undefined);
  return () => releasePhoneVerifier(verifier, verifierRef, widgetReadyRef, () => {
    active = false;
  });
}

function releasePhoneVerifier(
  verifier: RecaptchaVerifier,
  verifierRef: RefObject<RecaptchaVerifier | null>,
  widgetReadyRef: RefObject<boolean>,
  deactivate: () => void,
): void {
  deactivate();
  widgetReadyRef.current = false;
  verifier.clear();
  verifierRef.current = null;
}

async function submitPhone(
  phone: string,
  verifier: RecaptchaVerifier | null,
  sendLockRef: RefObject<boolean>,
  setPending: (pending: boolean) => void,
  setServerError: (message: string) => void,
  onCodeSent: (confirmation: PhoneConfirmation, phoneNumber: string) => void,
) {
  if (sendLockRef.current) return;
  const phoneNumber = normalizePhone(phone);
  if (!phoneNumber) {
    setServerError(validatePhone(phone) ?? PHONE_AUTH_ERROR_FALLBACK);
    return;
  }
  if (!verifier) {
    setServerError(PHONE_AUTH_ERROR_FALLBACK);
    return;
  }
  sendLockRef.current = true;
  setServerError("");
  setPending(true);
  try {
    onCodeSent(await sendPhoneCode(phoneNumber, verifier), phoneNumber);
  } catch (error) {
    setServerError(phoneAuthErrorMessage(error));
    setPending(false);
    sendLockRef.current = false;
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
      <Label className="font-inter text-field-label text-text-primary">Celular</Label>
      <Input
        className="min-h-touch w-full rounded-md border border-border-field bg-surface-subtle px-field-x py-md font-inter text-field text-text-primary outline-none placeholder:text-text-primary/40 data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
        autoComplete="tel"
        inputMode="tel"
      />
      <FieldError className="font-roboto text-caption text-danger" />
    </TextField>
  );
}

function validatePhone(value: string): string | null {
  if (normalizePhone(value)) return null;
  return "Informe um celular válido com DDD.";
}
