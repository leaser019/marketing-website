'use client'
import { Error } from "@/components/common/Error";
import { FeaturedFilmsSkeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_ALL_FILMS } from "@/graphql/queries";
import { FilmDetailProps } from "@/types/films";
import { useQuery } from "@apollo/client";
import Image from 'next/image';
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <section className="flex flex-col lg:flex-row items-center gap-12 py-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Explore <span className="text-primary">Star Wars</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Journey through distant galaxies, meet iconic characters, and discover the films that shaped pop culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/films-list">Explore</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/characters">Watch Character</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative w-full aspect-[16/9] bg-muted rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent flex items-center justify-center">
              <Image
              src="/images/star-wars.webp"
              width={800}
              height={800}
              alt="Star Wars Picture"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Special Films</h2>
          <Button variant="ghost" asChild>
            <Link href="/films-list">Watch All Films</Link>
          </Button>
        </div>
        
        <Suspense fallback={<FeaturedFilmsSkeleton />}>
          <FeaturedFilms />
        </Suspense>
      </section>
    </div>
  );
}

function FeaturedFilms() {
  const { data, loading, error } = useQuery(GET_ALL_FILMS);
  
  if (loading) return <FeaturedFilmsSkeleton />;
  if (error) return <Error message={error.message} />;
  
  const featuredFilms = data?.allFilms?.films?.slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredFilms.map((film: FilmDetailProps) => (
        <Card key={film.id} className="transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle>{film.title}</CardTitle>
            <CardDescription>{film.releaseDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{film.openingCrawl}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href={`/films-list/${film.id}`}>Detail</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
