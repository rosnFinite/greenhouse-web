import { NextUIProvider } from "@nextui-org/react";
import type { NextPage } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

import { darkTheme, lightTheme } from "lib/styles/theme";
import "lib/styles/globals.css";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <NextThemesProvider
      defaultTheme="light"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>{getLayout(<Component {...pageProps} />)}</NextUIProvider>
    </NextThemesProvider>
  );
}
