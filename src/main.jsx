import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";

const App = lazy(() => import("./App.jsx"));
<Suspense fallback={<h2>Loading App...</h2>}>
  <App />
</Suspense>
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);