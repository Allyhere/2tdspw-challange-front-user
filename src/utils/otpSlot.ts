export function slotClass(isActive: boolean, isFocused: boolean, isInvalid: boolean): string {
  const focus = slotFocus(isActive, isFocused);
  const border = slotBorder(isActive, isInvalid);
  return `relative flex h-touch items-center justify-center rounded-sm border bg-surface-subtle font-inter text-heading-2 text-text-primary tabular-nums ${focus} ${border}`;
}

function slotFocus(isActive: boolean, isFocused: boolean): string {
  if (isActive && isFocused) {
    return "outline-2 outline-solid outline-offset-2 outline-primary-dark";
  }
  return "outline-none";
}

function slotBorder(isActive: boolean, isInvalid: boolean): string {
  if (isInvalid) return "border-danger";
  if (isActive) return "border-primary-dark";
  return "border-border-field";
}
