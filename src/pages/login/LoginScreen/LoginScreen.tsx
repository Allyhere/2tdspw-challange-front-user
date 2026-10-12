import { LoginBrand } from "@/pages/login/LoginPanel/LoginBrand";
import { LoginPanel } from "@/pages/login/LoginPanel/LoginPanel";
import type { LoginScreenProps } from "@/pages/login/LoginScreen/LoginScreen.types";

export function LoginScreen({ children }: LoginScreenProps) {
  return (
    <main className="relative flex h-dvh w-full items-center px-xl lg:mx-auto lg:grid lg:max-w-login lg:grid-cols-5 lg:items-stretch lg:px-0">
      <LoginPanel />
      <LoginFormColumn>{children}</LoginFormColumn>
    </main>
  );
}

function LoginFormColumn({ children }: LoginScreenProps) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-login-card rounded-panel bg-surface-base px-xl py-2xl shadow-card lg:col-span-2 lg:mx-0 lg:flex lg:h-full lg:max-w-none lg:items-center lg:justify-center lg:rounded-none lg:bg-transparent lg:px-2xl lg:pt-xl lg:pb-2xl lg:shadow-none">
      <div className="flex w-full flex-col gap-2xl lg:max-w-login-form">
        <LoginCopy />
        {children}
      </div>
    </section>
  );
}

function LoginCopy() {
  return (
    <div className="flex flex-col gap-md">
      <LoginBrand />
      <h1 className="font-inter text-heading-1 text-balance text-text-primary">
        Entrar
      </h1>
      <div className="flex flex-col gap-sm">
        <p className="font-roboto text-body text-pretty text-text-primary">
          Use o celular cadastrado na clínica para receber um código.
        </p>
        <p className="font-roboto text-caption text-pretty text-text-primary">
          Você pode receber um SMS e a operadora pode cobrar tarifas.
        </p>
      </div>
    </div>
  );
}
