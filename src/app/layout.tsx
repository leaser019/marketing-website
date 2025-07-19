import Header from "@/components/common/Header";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Star Wars Universe | Explore Films and Characters",
    template: "%s | Star Wars Universe"
  },
  description: "Explore the Star Wars universe with the most comprehensive collection of films and characters. Discover in-depth details about legendary movies and iconic characters.",
  keywords: ["Star Wars", "Star Wars movies", "Star Wars characters", "Star Wars universe"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header/>
      <body className="mx-8 px-8">
          {children}
      </body>
    </html>
  );
}
