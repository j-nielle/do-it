"use client";

import { Button } from "@heroui/button";
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
      <p>
        Something went wrong!{" "}
        <span className="font-bold text-red-600">{error.message}</span>
      </p>
      <Button onPress={() => reset()}>Try again</Button>
    </div>
  );
}
