import React from "react";
import { getErrorMessage } from "./common";

export const lazyWithRetries: typeof React.lazy = (importer) => {
  const retryImport = async () => {
    try {
      return await importer();
    } catch (error) {
      // retry 5 times with 2 second delay and backoff factor of 2 (2, 4, 8, 16, 32 seconds)
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
        const errorMessage = getErrorMessage(error);
        // this assumes that the exception will contain this specific text with the url of the module
        // if not, the url will not be able to parse and we'll get an error on that
        // eg. "Failed to fetch dynamically imported module: https://example.com/assets/Home.tsx"
        const url = new URL(
          errorMessage
            .replace("Failed to fetch dynamically imported module: ", "")
            .trim()
        );
        // add a timestamp to the url to force a reload the module (and not use the cached version - cache busting)
        url.searchParams.set("t", `${+new Date()}`);

        try {
          return await import(url.href);
        } catch (e) {
          console.warn("retrying import");
        }
      }
      throw error;
    }
  };
  return React.lazy(retryImport);
};
