import { Libre_Franklin, Mukta_Vaani, Hind } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import mountainTheme from "@/theme";
import type { Metadata } from "next";
import "./globals.css";

/**
 * TODO Trim down font weights that aren't being used in the
 */
const libreFranklin = Libre_Franklin({
  variable: "--font-heading",
  subsets: ["latin"],
});

const muktaVaani = Mukta_Vaani({
  variable: "--font-subheading",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const hind = Hind({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bryan Patrick's Portfolio",
  description: "About me, Bryan Patrick, a dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libreFranklin.variable} ${muktaVaani.variable} ${hind.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={mountainTheme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
