import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  envPrefix: ["VITE_", "EXPO_PUBLIC_FIREBASE_"],
  plugins: [react(), tailwindcss(), serviceWorker()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

function serviceWorker() {
  return VitePWA({
    registerType: "autoUpdate",
    injectRegister: false,
    manifest: false,
    includeAssets: [
      "favicon.svg",
      "icons.svg",
      "manifest.webmanifest",
      "icon-192.png",
      "icon-512.png",
      "icon-maskable-512.png",
    ],
    workbox: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "index.html",
      navigateFallbackAllowlist: [/^\/$/, /^\/home$/, /^\/conversation$/],
      globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"],
    },
  });
}
