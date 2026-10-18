import { Button, Link, Menu, MenuItem, MenuTrigger, Popover, Separator } from "react-aria-components";
import { useLocation } from "react-router-dom";
import vetiLogo from "@/assets/veti-logo.png";
import { useAuth } from "@/auth/useAuth/useAuth";
import { menuButtonClass, menuItemClass } from "@/styles/controls/controls.constants";

export function AppHeader() {
  return (
    <header>
      <nav
        aria-label="Principal"
        className="mx-auto flex w-full max-w-shell items-center justify-between px-lg py-sm"
      >
        <Link
          href="/home"
          aria-label="Veti"
          className="inline-flex min-h-touch items-center outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark"
        >
          <img src={vetiLogo} alt="Veti" width={523} height={230} className="h-logo w-auto" />
        </Link>
        <NavMenu />
      </nav>
    </header>
  );
}

function NavMenu() {
  const { signOut } = useAuth();
  const { pathname } = useLocation();
  const plan = pathname === "/home" || pathname.startsWith("/conversation");
  const config = pathname === "/config" || pathname === "/notification";

  return (
    <MenuTrigger>
      <MenuButton />
      <Popover placement="bottom end" className={menuPopoverClass}>
        <Menu className="flex flex-col gap-xs outline-none">
          <MenuItem
            href="/home"
            aria-current={plan ? "page" : undefined}
            className={plan ? currentItemClass : menuItemClass}
          >
            Plano
          </MenuItem>
          <MenuItem
            href="/config"
            aria-current={config ? "page" : undefined}
            className={config ? currentItemClass : menuItemClass}
          >
            Configurações
          </MenuItem>
          <Separator className="mx-sm my-xs h-px border-0 bg-border-divider" />
          <MenuItem onAction={signOut} className={menuItemClass}>
            Sair
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function MenuButton() {
  return (
    <Button aria-label="Menu" className={menuButtonClass}>
      <span className="grid size-icon">
        <svg
          viewBox="0 0 18 18"
          aria-hidden="true"
          className="col-start-1 row-start-1 size-icon opacity-100 blur-none transition-icon group-aria-expanded:scale-icon-hidden group-aria-expanded:opacity-0 group-aria-expanded:blur-xs"
        >
          <path
            d="M3 5h12M3 9h12M3 13h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <svg
          viewBox="0 0 18 18"
          aria-hidden="true"
          className="col-start-1 row-start-1 size-icon scale-icon-hidden opacity-0 blur-xs transition-icon group-aria-expanded:scale-100 group-aria-expanded:opacity-100 group-aria-expanded:blur-none"
        >
          <path
            d="M5 5l8 8M13 5l-8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </Button>
  );
}

const menuPopoverClass =
  "w-menu origin-top-right rounded-md bg-surface-base p-xs shadow-floating outline-none data-entering:animate-menu-enter data-exiting:animate-menu-exit";

const currentItemClass = `${menuItemClass} bg-primary-light`;
