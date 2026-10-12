import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import type { AuthProviderProps } from "@/auth/AuthProvider/AuthProvider.types";
import { readTutorSession } from "@/auth/session/readTutorSession";
import type { AuthUser } from "@/auth/session/session.types";
import { AuthContext } from "@/auth/useAuth/useAuth.constants";
import type { AuthContextValue } from "@/auth/useAuth/useAuth.types";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(() => !isFirebaseConfigured());
  useFirebaseSession(setUser, setIsReady);
  const value = useMemo(
    () => createAuthValue(user, isReady, setUser),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useFirebaseSession(
  setUser: (user: AuthUser | null) => void,
  setIsReady: (ready: boolean) => void,
) {
  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    return onAuthStateChanged(getFirebaseAuth(), (next) => {
      void applySession(next, setUser, setIsReady);
    });
  }, [setUser, setIsReady]);
}

async function applySession(
  next: User | null,
  setUser: (user: AuthUser | null) => void,
  setIsReady: (ready: boolean) => void,
) {
  setUser(await readTutorSession(next));
  setIsReady(true);
}

function createAuthValue(
  user: AuthUser | null,
  isReady: boolean,
  setUser: (user: AuthUser | null) => void,
): AuthContextValue {
  return {
    user,
    isReady,
    signIn: (next) => {
      setUser(next);
    },
    signOut: () => {
      setUser(null);
      void signOutOfFirebase();
    },
  };
}

function signOutOfFirebase() {
  if (!isFirebaseConfigured()) return;
  return firebaseSignOut(getFirebaseAuth());
}
