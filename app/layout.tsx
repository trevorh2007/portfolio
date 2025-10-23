import type { Metadata } from "next";

import ErrorBoundary from "./components/shared/ErrorBoundary";
import NavBar from "./components/shared/navbar";
import GlobalStyles from "./styles/GlobalStyles";
import { Providers } from "./styles/Providers";

export const metadata: Metadata = {
  title: "Trevors Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalStyles />
          <ErrorBoundary>
            <NavBar />
            {props.children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
