import { Button, Link } from "react-aria-components";
import vetiLogo from "@/assets/veti-logo.png";
import { useAuth } from "@/auth/useAuth/useAuth";
import { secondaryButtonClass } from "@/styles/controls/controls.constants";

export function AppHeader() {
  const { signOut } = useAuth();

  return (
    <header className="border-b border-border-divider bg-surface-base shadow-floating">
      <div className="mx-auto flex w-full max-w-shell items-center justify-between px-lg py-sm">
        <Link
          href="/home"
          aria-label="Veti"
          className="inline-flex min-h-touch items-center outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
        >
          <img
            src={vetiLogo}
            alt="Veti"
            width={523}
            height={230}
            className="h-logo w-auto"
          />
        </Link>
        <Button type="button" className={secondaryButtonClass} onPress={signOut}>
          Sair
        </Button>
      </div>
    </header>
  );
}
