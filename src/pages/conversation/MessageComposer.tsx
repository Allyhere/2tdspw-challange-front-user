import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { Button, Form, Label, TextArea, TextField } from "react-aria-components";

const messageLimit = 2000;

export function MessageComposer({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const trimmed = text.trim();
  const canSend = !disabled && trimmed.length > 0;

  useLayoutEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    area.style.height = "auto";
    area.style.height = `${area.scrollHeight}px`;
  }, [text]);

  function submit() {
    if (!canSend) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <Form
      className="border-t border-border-divider bg-surface-base p-sm"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <ComposerField
        text={text}
        areaRef={areaRef}
        disabled={disabled}
        canSend={canSend}
        onChange={setText}
        onSubmit={submit}
      />
    </Form>
  );
}

function ComposerField({
  text,
  areaRef,
  disabled,
  canSend,
  onChange,
  onSubmit,
}: {
  text: string;
  areaRef: RefObject<HTMLTextAreaElement | null>;
  disabled: boolean;
  canSend: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <TextField
      value={text}
      onChange={onChange}
      maxLength={messageLimit}
      isDisabled={disabled}
      className="flex items-end gap-sm"
    >
      <Label className="sr-only">Mensagem</Label>
      <TextArea
        ref={areaRef}
        rows={1}
        placeholder="Escreva uma mensagem"
        enterKeyHint="send"
        className="max-h-composer min-h-touch w-full resize-none overflow-y-auto rounded-sm border border-border-divider bg-surface-subtle px-lg py-sm font-roboto text-body text-text-primary outline-none placeholder:text-text-primary/40 data-disabled:opacity-60 data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
        onKeyDown={(event) => {
          if (!sendsOnEnter(event)) return;
          event.preventDefault();
          onSubmit();
        }}
      />
      <Button
        type="submit"
        aria-label="Enviar"
        isDisabled={!canSend}
        className="inline-flex size-touch shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-light outline-none transition-press data-hovered:bg-primary-dark data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark data-disabled:cursor-not-allowed data-disabled:opacity-60"
      >
        <PaperPlaneTiltIcon className="size-xl translate-x-px" aria-hidden="true" weight="fill" />
      </Button>
    </TextField>
  );
}

function sendsOnEnter(event: KeyboardEvent<HTMLTextAreaElement>): boolean {
  if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return false;
  return true;
}
