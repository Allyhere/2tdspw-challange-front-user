import { Button, Form, Input, Label, TextField } from "react-aria-components";
import { useState } from "react";

const messageLimit = 2000;

export function MessageComposer({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const trimmed = text.trim();

  function submit() {
    if (disabled || trimmed.length === 0) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <Form
      className="flex flex-col gap-md"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <TextField
        value={text}
        onChange={setText}
        maxLength={messageLimit}
        isRequired
        className="flex flex-col gap-xs"
      >
        <Label className="font-inter text-field-label text-text-primary">Mensagem</Label>
        <Input className="min-h-touch w-full rounded-md border border-border-field bg-surface-subtle px-field-x py-md font-inter text-field text-text-primary outline-none placeholder:text-text-primary/40 data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark" />
      </TextField>
      <Button
        type="submit"
        className="inline-flex min-h-touch w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary p-lg font-roboto text-button-lg text-primary-light outline-none transition-press data-hovered:border-primary-dark data-hovered:bg-primary-dark data-pressed:scale-press data-pressed:border-primary-dark data-pressed:bg-primary-dark data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-not-allowed data-disabled:opacity-60"
        isDisabled={disabled || trimmed.length === 0}
      >
        Enviar
      </Button>
    </Form>
  );
}
