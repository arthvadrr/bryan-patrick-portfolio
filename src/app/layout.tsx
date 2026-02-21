import Providers from "./providers";
import ParallaxBackground from "../../components/ParallaxBackground/ParallaxBackground";
import { Black_Han_Sans, Space_Grotesk, Lexend } from "next/font/google";
import type { Metadata } from "next";

// TODO Trim down font weights that aren't being used in the site
const blackHanSans = Black_Han_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-subheading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lexend = Lexend({
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
      <body className={`${blackHanSans.variable} ${spaceGrotesk.variable} ${lexend.variable}`}>
        <Providers>
          <ParallaxBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
