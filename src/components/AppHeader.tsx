import { Link } from "react-aria-components";
import { textLinkClass } from "@/styles/controls/controls.constants";

export function AppHeader() {
  return (
    <header className="border-b border-border-divider bg-surface-base shadow-floating">
      <div className="mx-auto flex w-full max-w-shell items-center px-lg py-sm">
        <Link href="/home" className={textLinkClass}>
          Veti
        </Link>
      </div>
    </header>
  );
}
