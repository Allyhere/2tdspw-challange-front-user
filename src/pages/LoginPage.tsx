import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PendingSession } from "@/auth/PendingSession/PendingSession";
import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import { useAuth } from "@/auth/useAuth/useAuth";
import { usePageTitle } from "@/lib/usePageTitle";
import { CodeForm } from "@/pages/login/CodeForm/CodeForm";
import { PhoneForm } from "@/pages/login/PhoneForm/PhoneForm";

export function LoginPage() {
  const { user, isReady, signIn } = useAuth();
  const [confirmation, setConfirmation] = useState<PhoneConfirmation | null>(
    null,
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  usePageTitle("Entrar | Veti");

  if (!isReady) return <PendingSession />;
  if (user) return <Navigate to="/home" replace />;

  function handleCodeSent(next: PhoneConfirmation, phone: string) {
    setConfirmation(next);
    setPhoneNumber(phone);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-shell flex-col justify-center px-lg py-xl">
      <section className="rounded-md bg-surface-base p-xl shadow-subtle">
        <h1 className="font-inter text-heading-1 text-balance text-text-primary">
          Entrar
        </h1>
        <p className="mt-sm font-roboto text-body text-pretty text-text-primary">
          Use o celular cadastrado na clínica para receber um código.
        </p>
        <p className="mt-sm font-roboto text-body text-pretty text-text-primary">
          Você pode receber um SMS e a operadora pode cobrar tarifas.
        </p>
        <div className="mt-xl">
          {confirmation ? (
            <CodeForm
              confirmation={confirmation}
              phoneNumber={phoneNumber}
              onBack={() => setConfirmation(null)}
              onSuccess={signIn}
            />
          ) : (
            <PhoneForm onCodeSent={handleCodeSent} />
          )}
        </div>
      </section>
    </main>
  );
}
