"use client";
import { FilmsListSkeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_ALL_FILMS } from "@/graphql/queries";
import { useFilmStore } from "@/store/store";
import { useQuery } from "@apollo/client";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FilmList() {
  const addFilm = useFilmStore((state) => state.addFilm);
  const listFilm = useFilmStore(state => state.listFilm)
  const { data, loading, error } = useQuery(GET_ALL_FILMS);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  
  useEffect(() => {
    if (!loading && data?.allFilms?.films && listFilm.length === 0) {
      addFilm(data.allFilms.films);
    }
  }, [data, addFilm, loading, listFilm]);
  
  if (loading) return <FilmsListSkeleton />;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h2 className="text-2xl font-bold text-destructive mb-4">Error!</h2>
      <p className="text-lg text-muted-foreground text-center max-w-lg">
        Error: {error.message}. Try again!
      </p>
      <Button className="mt-6" onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  );
  
  const films = [...(data?.allFilms?.films || [])];
  
  if (sortBy === "date") {
    films.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
  } else {
    films.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="container mx-auto py-10 px-4 mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">List Films Star Wars</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Sort By Date
          </Button>
          <Button
            variant={sortBy === "title" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("title")}
          >
            <User className="h-4 w-4 mr-1" />
            Sort By Name
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {films.map((film) => (
          <Card key={film.id} className="transition-all hover:shadow-lg flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{film.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {film.releaseDate}
                </div>
                <div className="mt-1"> <strong>Director:</strong> {film.director}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-4 text-sm text-muted-foreground">{film.openingCrawl}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/films-list/${film.id}`}>Detail</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

