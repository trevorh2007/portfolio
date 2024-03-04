import type { Metadata } from "next";
import GlobalStyles from "./styles/GlobalStyles";
import NavBar from "./components/shared/navbar";
import { Providers } from "./styles/Providers";

export const metadata: Metadata = {
  title: "Trevors Portfolio",
  description: "Personal portfolio",
  icons: "favicon.ico",
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <Providers>
          <GlobalStyles />
          <NavBar />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
