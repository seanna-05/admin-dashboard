import { ErrorBoundary } from "react-error-boundary";
import App from "./App";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>💥 Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

root.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
);