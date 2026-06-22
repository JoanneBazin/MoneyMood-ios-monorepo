import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.js";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SessionProvider } from "./components/auth/SessionProvider";
import { persister, queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const app = (
  <StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>
);

createRoot(container).render(
  persister ? (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {app}
    </PersistQueryClientProvider>
  ) : (
    <QueryClientProvider client={queryClient}>{app}</QueryClientProvider>
  ),
);
