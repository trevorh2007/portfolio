import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./styles/Providers";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const inter = Inter({ subsets: ["latin"] });

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
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
