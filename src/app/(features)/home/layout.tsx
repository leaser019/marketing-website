
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Star Wars Universe | Explore Films and Characters",
    template: "%s | Star Wars Universe"
  },
  description: "Discover the Star Wars universe with the most complete collection of films and characters. Dive into detailed information about legendary movies and iconic characters.",
  keywords: ["Star Wars", "Star Wars movies", "Star Wars characters", "Star Wars universe"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
}


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-5 px-5">
          {children}
      </body>
    </html>
  );
}
