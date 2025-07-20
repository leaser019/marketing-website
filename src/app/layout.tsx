import Header from "@/components/common/Header";
import { ThemeProvider } from '@/components/ui/themeProvider';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Star Wars Universe',
    template: '%s',
  },
  description:
    'Explore the Star Wars universe with the most comprehensive collection of films and characters. Discover in-depth details about legendary movies and iconic characters.',
  keywords: ['Star Wars', 'Star Wars movies', 'Star Wars characters', 'Star Wars universe'],
  authors: [{ name: 'Vo Minh Khang' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-8 px-8 transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen pt-24">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
