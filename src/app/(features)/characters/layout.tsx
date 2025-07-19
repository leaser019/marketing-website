
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character List | Star Wars Universe",
  description: "Explore the iconic characters of the Star Wars universe. Learn about their backgrounds, roles, and appearances across the saga.",
  openGraph: {
    title: "Star Wars Characters | Star Wars Universe",
    description: "Discover the most legendary characters in the Star Wars universe, from Jedi to Sith and everything in between.",
    images: ["/images/star-wars-characters.webp"],
  }
};

export default function CharacterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className="my-15 px-15">
          {children}
      </body>
    </html>
  );
}
