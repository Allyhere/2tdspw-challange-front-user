import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import {
  QUERY_CACHE_MAX_AGE,
  queryPersister,
  shouldPersistQuery,
} from "@/lib/persist/queryCache";
import { registerProductionServiceWorker } from "@/lib/pwa/registerServiceWorker";
import { queryClient } from "@/lib/queryClient";
import "@/index.css";

registerProductionServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: QUERY_CACHE_MAX_AGE,
        dehydrateOptions: { shouldDehydrateQuery: shouldPersistQuery },
      }}
    >
      <App />
    </PersistQueryClientProvider>
  </StrictMode>,
)
