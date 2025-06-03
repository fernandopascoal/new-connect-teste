import React, { ReactNode, useRef, useState } from 'react';

import Bugsnag, { Event } from '@bugsnag/js';

const ErrorBoundaryConnect = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState('');
  const onError = (event: Event) => {
    if (event.getMetadata('errorId').errorId) {
      setError(event.getMetadata('errorId').errorId);
    }
  };

  const ErrorBoundary = useRef(
    Bugsnag.getPlugin('react')?.createErrorBoundary(React)
  );

  const ErrorFallback = () => {
    return (
      <div
        role="alert"
        className="h-[100vh] flex items-center justify-center font-poppins font-medium sm:text-2xl text-base flex-col gap-6 text-center"
      >
        <p>
          Parece que temporariamente estamos com um problema para lhe atender.
        </p>
        <p>Por favor, tente novamente mais tarde.</p>
        <p className="sm:text-base text-xs text-gray-600">{error}</p>
      </div>
    );
  };
  if (ErrorBoundary.current)
    return (
      <ErrorBoundary.current
        FallbackComponent={ErrorFallback}
        onError={onError}
      >
        {children}
      </ErrorBoundary.current>
    );
  else return <>{children}</>;
};

export default ErrorBoundaryConnect;
