"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error.message, error.name, error.cause, error.stack);
  }, [error]);

  return (
    <div>
      <h2>
        Something went wrong!{" "}
        <span className="font-bold text-red-600">[{error.message}]</span>
      </h2>
      <p>{error.stack}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </button>
    </div>
  );
}
