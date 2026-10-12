import { Button, Form, Input, Label, TextField } from "react-aria-components";
import { useState } from "react";
import {
  inputClass,
  labelClass,
  primaryButtonClass,
} from "@/styles/controls/controls.constants";

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
        <Label className={labelClass}>Mensagem</Label>
        <Input className={inputClass} />
      </TextField>
      <Button
        type="submit"
        className={primaryButtonClass}
        isDisabled={disabled || trimmed.length === 0}
      >
        Enviar
      </Button>
    </Form>
  );
}
