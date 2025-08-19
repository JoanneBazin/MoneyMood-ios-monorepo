import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "./components/auth/SessionProvider";
import { queryClient } from "./lib/queryClient";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </QueryClientProvider>
  </StrictMode>
);
