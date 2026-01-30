import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.js";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SessionProvider } from "./components/auth/SessionProvider";
import { persister, queryClient } from "./lib/queryClient";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

createRoot(container).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <SessionProvider>
        <App />
      </SessionProvider>
    </PersistQueryClientProvider>
  </StrictMode>,
);
