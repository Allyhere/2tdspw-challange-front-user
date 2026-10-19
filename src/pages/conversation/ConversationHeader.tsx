import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Link } from "react-aria-components";

export function ConversationHeader({
  title,
  detail,
}: {
  title: string;
  detail: string | null;
}) {
  return (
    <header className="flex items-center gap-sm border-b border-border-divider px-sm py-sm">
      <Link
        href="/home"
        aria-label="Voltar ao plano"
        className="inline-flex size-touch shrink-0 items-center justify-center rounded-full text-text-primary outline-none transition-nav data-hovered:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
      >
        <ArrowLeftIcon className="size-xl" aria-hidden="true" weight="bold" />
      </Link>
      <div className="min-w-0 flex-1">
        <h1 id="conversation-heading" className="truncate font-inter text-heading-2 text-text-primary">
          {title}
        </h1>
        {detail ? (
          <p className="truncate font-roboto text-caption text-text-secondary">{detail}</p>
        ) : null}
      </div>
    </header>
  );
}
