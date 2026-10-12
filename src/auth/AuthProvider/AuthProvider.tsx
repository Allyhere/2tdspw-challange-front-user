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
import { clearSignedInCache } from "@/lib/persist/clearSignedInCache";
import { removeWebPushSubscription } from "@/lib/pwa/webPush";
import { requestPersistentStorage } from "@/lib/persist/persistentStorage";
import { unsealQueryCache } from "@/lib/persist/queryCache";

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
  const tutor = await readTutorSession(next);
  if (tutor) openSignedInStorage();
  setUser(tutor);
  setIsReady(true);
}

function openSignedInStorage(): void {
  unsealQueryCache();
  requestPersistentStorage();
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
      openSignedInStorage();
      setUser(next);
    },
    signOut: () => {
      const uid = user?.uid;
      setUser(null);
      void endSignedInSession(uid);
    },
  };
}

async function endSignedInSession(uid: string | undefined): Promise<void> {
  await removeWebPushSubscription();
  await clearSignedInCache(uid);
  await signOutOfFirebase();
}

function signOutOfFirebase(): Promise<void> {
  if (!isFirebaseConfigured()) return Promise.resolve();
  return firebaseSignOut(getFirebaseAuth());
}
