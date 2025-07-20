'use client'
import { FadeIn, HoverCard, StaggeredContainer } from "@/components/common/Animations";
import { Error } from "@/components/common/Error";
import { FeaturedFilmsSkeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PageTransition from "@/components/ui/pageTransition";
import { GET_ALL_FILMS } from "@/graphql/queries";
import { FilmDetailProps } from "@/types/films";
import { useQuery } from "@apollo/client";
import Image from 'next/image';
import Link from "next/link";
import { Suspense } from "react";

function FeaturedFilms() {
  const { data, loading, error } = useQuery(GET_ALL_FILMS);
  if (loading) return <FeaturedFilmsSkeleton />;
  if (error) return <Error message={error.message} />;

  const featuredFilms = data?.allFilms?.films?.slice(0, 3) || [];

  return (
    <StaggeredContainer staggerDelay={150} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredFilms.map((film: FilmDetailProps) => (
        <HoverCard key={film.id}>
          <Card className="transition-all hover:shadow-lg h-full">
            <CardHeader>
              <CardTitle>{film.title}</CardTitle>
              <CardDescription>{film.releaseDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{film.openingCrawl}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full transition-colors hover:bg-primary hover:text-primary-foreground">
                <Link href={`/films-list/${film.id}`}>Detail</Link>
              </Button>
            </CardFooter>
          </Card>
        </HoverCard>
      ))}
    </StaggeredContainer>
  );
}

export default function HomePage() {
  return (
    <PageTransition>
      <div className="container mx-auto py-10 px-4">
        <section className="flex flex-col lg:flex-row items-center gap-12 py-16">
          <FadeIn direction="left" delay={300} className="flex-1 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Explore <span className="text-primary animate-pulse-slow">Star Wars</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Journey through distant galaxies, meet iconic characters, and discover the films that shaped pop culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="hover:scale-105 transition-transform">
                <Link href="/films-list">Explore Films</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-transform">
                <Link href="/characters">Watch Character</Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={500} className="flex-1">
            <div className="relative w-full aspect-[16/9] bg-muted rounded-lg overflow-hidden animate-float">
              <div className="absolute inset-0 from-primary/30 to-transparent flex items-center justify-center">
                <Image
                  src="/images/star-wars.webp"
                  width={800}
                  height={800}
                  alt="Star Wars Picture"
                />
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="py-16">
          <FadeIn direction="up" delay={600}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Special Films</h2>
              <Button variant="ghost" asChild className="hover:scale-105 transition-transform">
                <Link href="/films-list">Watch All Films</Link>
              </Button>
            </div>
          </FadeIn>
          <Suspense fallback={<FeaturedFilmsSkeleton />}>
            <FeaturedFilms />
          </Suspense>
        </section>
      </div>
    </PageTransition>
  );
}

