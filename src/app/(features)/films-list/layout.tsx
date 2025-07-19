
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie List | Star Wars Universe",
  description: "A complete list of all Star Wars movies to date. Explore details, directors, and release dates.",
  openGraph: {
    title: "All Star Wars Movies | Star Wars Universe",
    description: "A complete list of all Star Wars movies to date.",
    images: ["/images/star-wars.webp"],
  }
};

export default function FilmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-10 mx-15">
          {children}
      </body>
    </html>
  );
}
