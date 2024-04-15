import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./common/components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ApiErrorBoundary from "./common/components/ApiErrorBoundary.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiErrorBoundary>
        <Suspense fallback={<div>Error</div>}>
          <App />
        </Suspense>
      </ApiErrorBoundary>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
