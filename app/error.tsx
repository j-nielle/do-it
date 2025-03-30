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
      <h2>
        Something went wrong!{" "}
        <span className="font-bold text-red-600">{error.message}</span>
      </h2>
      <Button onPress={() => reset()}>Try again</Button>
    </div>
  );
}
