import type { Metadata } from "next";
import "./globals.css";

import ErrorBoundary from "./components/shared/ErrorBoundary";
import Header from "./components/shared/Header";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Trevors Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Providers>
          <ErrorBoundary>
            <Header />
            {props.children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
