import type { Metadata } from "next";
import GlobalStyles from "./styles/GlobalStyles";
import NavBar from "./components/navbar/navbar";
import { Providers } from "./styles/Providers";

export const metadata: Metadata = {
  title: "Fatality Discord Bot",
  description: "Some controls for fatality discord bot",
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
