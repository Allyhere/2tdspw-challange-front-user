/// <reference types="vite-plugin-pwa/vanillajs" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_RAG_API_URL?: string;
  readonly VITE_VAPID_PUBLIC_KEY?: string;
  readonly EXPO_PUBLIC_FIREBASE_API_KEY?: string;
  readonly EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
  readonly EXPO_PUBLIC_FIREBASE_PROJECT_ID?: string;
  readonly EXPO_PUBLIC_FIREBASE_APP_ID?: string;
}
