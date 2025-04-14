import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";
import UIProvider from "@/components/ui/provider";
import { TopLoader } from "@/components/ui/top-loader";
import { Suspense } from "react";
import LoadingPage from "./(protected)/loading";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export async function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <TopLoader />
        <AuthProvider>
          <UIProvider>
            <ToastProvider placement="top-right" toastOffset={40} />
            <Analytics />
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </UIProvider>
        </AuthProvider>
      </Suspense>
    </>
  );
}
