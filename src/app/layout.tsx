import Providers from './providers';
import { Black_Han_Sans, Space_Grotesk, Lexend, IBM_Plex_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const blackHanSans = Black_Han_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: '400',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-subheading',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const lexend = Lexend({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const IBMPlexMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Bryan Patrick',
  description: 'About me, Bryan Patrick, a dev',
};

/*========================
 * "Off we go again."
 *
 * Vlad, Waiting for Godot
 *========================*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${blackHanSans.variable} ${spaceGrotesk.variable} ${lexend.variable} ${IBMPlexMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
