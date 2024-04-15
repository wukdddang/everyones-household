import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

const ApiErrorFallback = ({ error, resetErrorBoundary }) => {
  if (!isAxiosError(error)) {
    throw error;
  }

  return <Button onClick={resetErrorBoundary}>다시시도</Button>;
};

const ApiErrorBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  // const key = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ApiErrorFallback}
      onReset={reset}
      // resetKeys={[key]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;
