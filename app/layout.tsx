import type { Metadata } from "next";
import GlobalStyles from "./styles/GlobalStyles";
import NavBar from "./components/shared/navbar";
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
          <NavBar />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
