import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";
import type { OtpFieldProps } from "@/pages/login/CodeForm/CodeForm.types";
import { errorClass, labelClass } from "@/styles/controls/controls.constants";
import { slotClass } from "@/utils/otpSlot";

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
        pasteTransformer={(pasted) => pasted.replace(/\D/g, "")}
        aria-invalid={isInvalid || undefined}
        aria-describedby={isInvalid ? OTP_ERROR_ID : undefined}
        disabled={isDisabled}
        containerClassName={isDisabled ? "w-full opacity-60" : "w-full"}
        render={({ slots, isFocused }) => (
          <OtpSlots slots={slots} isFocused={isFocused} isInvalid={isInvalid} />
        )}
      />
      {isInvalid ? (
        <p id={OTP_ERROR_ID} className={errorClass} role="alert">
          {error}
        </p>
      ) : null}
    </div>
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
      {slot.hasFakeCaret ? (
        <span className="absolute top-1/2 left-1/2 h-lg w-px -translate-x-1/2 -translate-y-1/2 bg-text-primary" />
      ) : null}
    </div>
  );
}
