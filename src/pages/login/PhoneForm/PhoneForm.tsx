import { useState, type FormEvent } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { sendPhoneCode } from "@/auth/phoneAuth/phoneAuth";
import type { PhoneFieldProps, PhoneFormProps } from "@/pages/login/PhoneForm/PhoneForm.types";
import { normalizePhone } from "@/lib/phone/phone";
import {
  errorClass,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "@/styles/controls/controls.constants";

export function PhoneForm({ onCodeSent }: PhoneFormProps) {
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const phoneNumber = normalizePhone(phone);
    if (!phoneNumber) return;
    setPending(true);
    onCodeSent(await sendPhoneCode(phoneNumber), phoneNumber);
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-md">
      <PhoneField phone={phone} onChange={setPhone} />
      <Button type="submit" className={primaryButtonClass} isDisabled={pending}>
        Enviar código
      </Button>
    </Form>
  );
}

function PhoneField({ phone, onChange }: PhoneFieldProps) {
  return (
    <TextField
      name="phone"
      type="tel"
      value={phone}
      onChange={onChange}
      isRequired
      validationBehavior="aria"
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
