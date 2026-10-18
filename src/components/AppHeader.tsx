import { Button, Link } from "react-aria-components";
import { useLocation } from "react-router-dom";
import pageWash from "@/assets/page-wash.png";
import vetiLogo from "@/assets/veti-logo.png";
import { useAuth } from "@/auth/useAuth/useAuth";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 px-md pt-md pb-sm md:px-lg md:pt-lg md:pb-2xl">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-primary-light" aria-hidden="true">
        <img
          src={pageWash}
          alt=""
          width={460}
          height={460}
          className="absolute top-0 left-0 h-screen w-screen max-w-none object-cover opacity-40"
        />
      </div>
      <nav
        aria-label="Principal"
        className="relative mx-auto flex w-full max-w-dashboard flex-col gap-sm rounded-panel bg-surface-base p-sm shadow-floating md:flex-row md:items-center md:gap-lg md:px-md"
      >
        <div className="flex items-center justify-between gap-md md:contents">
          <HomeLink />
          <SignOutButton />
        </div>
        <SiteLinks />
      </nav>
    </header>
  );
}

function HomeLink() {
  return (
    <Link
      href="/home"
      aria-label="Veti"
      className="inline-flex min-h-touch shrink-0 items-center outline-none transition-nav data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
    >
      <img src={vetiLogo} alt="" width={523} height={230} className="h-logo w-auto" />
    </Link>
  );
}

function SiteLinks() {
  const { pathname } = useLocation();
  const plan = pathname === "/home" || pathname.startsWith("/conversation");
  const config = pathname === "/config" || pathname === "/notification";

  return (
    <ul className="flex min-w-0 items-center gap-xs rounded-pill bg-primary-light p-xs md:order-2 md:w-fit">
      <li className="min-w-0 flex-1 md:flex-none">
        <NavLink href="/home" current={plan} label="Plano" />
      </li>
      <li className="min-w-0 flex-1 md:flex-none">
        <NavLink href="/config" current={config} label="Configurações" />
      </li>
    </ul>
  );
}

function NavLink({ href, current, label }: { href: string; current: boolean; label: string }) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={current ? currentLinkClass : linkClass}
    >
      {label}
    </Link>
  );
}

function SignOutButton() {
  const { signOut } = useAuth();
  return (
    <Button type="button" onPress={signOut} className={signOutClass}>
      Sair
    </Button>
  );
}

const linkClass =
  "inline-flex min-h-touch w-full items-center justify-center rounded-full px-md font-roboto text-label text-text-primary outline-none transition-nav data-hovered:text-primary-dark data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark md:w-auto";

const currentLinkClass =
  "inline-flex min-h-touch w-full items-center justify-center rounded-full bg-surface-base px-md font-roboto text-label text-primary shadow-subtle outline-none transition-nav data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark md:w-auto";

const signOutClass =
  "inline-flex min-h-touch shrink-0 cursor-pointer items-center rounded-pill px-lg font-roboto text-label text-text-primary outline-none transition-nav data-hovered:bg-primary-light data-pressed:scale-press data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark md:order-3 md:ml-auto";
