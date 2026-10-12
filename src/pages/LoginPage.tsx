import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PendingSession } from "@/auth/PendingSession/PendingSession";
import type { PhoneConfirmation } from "@/auth/phoneAuth/phoneAuth.types";
import { useAuth } from "@/auth/useAuth/useAuth";
import { usePageTitle } from "@/lib/usePageTitle";
import { CodeForm } from "@/pages/login/CodeForm/CodeForm";
import { LoginScreen } from "@/pages/login/LoginScreen/LoginScreen";
import { PhoneForm } from "@/pages/login/PhoneForm/PhoneForm";

export function LoginPage() {
  const { user, isReady, signIn } = useAuth();
  const [confirmation, setConfirmation] = useState<PhoneConfirmation | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  usePageTitle("Entrar | Veti");

  if (!isReady) return <PendingSession />;
  if (user) return <Navigate to="/home" replace />;

  function handleCodeSent(next: PhoneConfirmation, phone: string) {
    setConfirmation(next);
    setPhoneNumber(phone);
  }

  return (
    <LoginScreen>
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
    </LoginScreen>
  );
}
