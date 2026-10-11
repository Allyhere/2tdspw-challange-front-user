import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
};

export function isFirebaseConfigured(): boolean {
  return readFirebaseConfig() !== null;
}

let firebaseAuth: Auth | null = null;

export function getFirebaseAuth(): Auth {
  if (firebaseAuth) return firebaseAuth;
  const config = readFirebaseConfig();
  if (!config) {
    throw new Error("Firebase is not configured.");
  }
  const auth = getAuth(getFirebaseApp(config));
  auth.languageCode = "pt";
  if (import.meta.env.DEV) {
    auth.settings.appVerificationDisabledForTesting = true;
  }
  firebaseAuth = auth;
  return auth;
}

function getFirebaseApp(config: FirebaseWebConfig): FirebaseApp {
  if (getApps().length > 0) return getApp();
  return initializeApp(config);
}

function readFirebaseConfig(): FirebaseWebConfig | null {
  const apiKey = import.meta.env.EXPO_PUBLIC_FIREBASE_API_KEY;
  const authDomain = import.meta.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = import.meta.env.EXPO_PUBLIC_FIREBASE_APP_ID;
  if (!apiKey || !authDomain || !projectId || !appId) return null;
  return { apiKey, authDomain, projectId, appId };
}
