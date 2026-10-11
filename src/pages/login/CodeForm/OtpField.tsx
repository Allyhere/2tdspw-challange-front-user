import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";
import type { OtpFieldProps } from "@/pages/login/CodeForm/CodeForm.types";
import { errorClass, labelClass } from "@/styles/controls/controls.constants";

const OTP_LENGTH = 6;
const OTP_INPUT_ID = "otp";
const OTP_ERROR_ID = "otp-error";

export function OtpField({ code, error, isDisabled, onChange }: OtpFieldProps) {
  const isInvalid = error.length > 0;

  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={OTP_INPUT_ID} className={labelClass}>
        Código
      </label>
      <OTPInput
        id={OTP_INPUT_ID}
        name="otp"
        value={code}
        onChange={onChange}
        maxLength={OTP_LENGTH}
        pattern={REGEXP_ONLY_DIGITS}
        inputMode="numeric"
        autoComplete="one-time-code"
        pasteTransformer={pastedDigits}
        aria-invalid={isInvalid || undefined}
        aria-describedby={isInvalid ? OTP_ERROR_ID : undefined}
        disabled={isDisabled}
        containerClassName={isDisabled ? "w-full opacity-60" : "w-full"}
        render={({ slots, isFocused }) => (
          <OtpSlots slots={slots} isFocused={isFocused} isInvalid={isInvalid} />
        )}
      />
      {isInvalid ? <OtpError message={error} /> : null}
    </div>
  );
}

function OtpError({ message }: { message: string }) {
  return (
    <p id={OTP_ERROR_ID} className={errorClass} role="alert">
      {message}
    </p>
  );
}

function OtpSlots({
  slots,
  isFocused,
  isInvalid,
}: {
  slots: SlotProps[];
  isFocused: boolean;
  isInvalid: boolean;
}) {
  return (
    <div className="grid grid-cols-6 gap-sm">
      {slots.map((slot, index) => (
        <OtpSlot
          key={index}
          slot={slot}
          isFocused={isFocused}
          isInvalid={isInvalid}
        />
      ))}
    </div>
  );
}

function OtpSlot({
  slot,
  isFocused,
  isInvalid,
}: {
  slot: SlotProps;
  isFocused: boolean;
  isInvalid: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={slotClass(slot.isActive, isFocused, isInvalid)}
    >
      {slot.char}
      {slot.hasFakeCaret ? <OtpCaret /> : null}
    </div>
  );
}

function OtpCaret() {
  return (
    <span className="absolute top-1/2 left-1/2 h-lg w-px -translate-x-1/2 -translate-y-1/2 bg-text-primary" />
  );
}

function slotClass(isActive: boolean, isFocused: boolean, isInvalid: boolean): string {
  const focus = slotFocus(isActive, isFocused);
  const border = slotBorder(isActive, isInvalid);
  return `relative flex h-touch items-center justify-center rounded-sm border bg-surface-subtle font-inter text-heading-2 text-text-primary tabular-nums ${focus} ${border}`;
}

function slotFocus(isActive: boolean, isFocused: boolean): string {
  if (isActive && isFocused) {
    return "outline-2 outline-offset-2 outline-primary-dark";
  }
  return "outline-none";
}

function slotBorder(isActive: boolean, isInvalid: boolean): string {
  if (isInvalid) return "border-danger";
  if (isActive) return "border-primary-dark";
  return "border-border-divider";
}

function pastedDigits(pasted: string): string {
  return pasted.replace(/\D/g, "");
}
