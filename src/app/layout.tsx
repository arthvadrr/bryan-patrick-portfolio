import Providers from "./providers";
import ParallaxBackground from "../../components/ParallaxBackground/ParallaxBackground";
import { VT323, Space_Grotesk, Inter } from "next/font/google";
import type { Metadata } from "next";

// TODO Trim down font weights that aren't being used in the site
const vt323 = VT323({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ['400']
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-subheading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bryan Patrick",
  description: "About me, Bryan Patrick, a dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
        <Providers>
          <ParallaxBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
