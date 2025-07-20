"use client";

import { Error } from "@/components/common/Error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateFilmSchema } from "@/lib/schemas";
import { useFilmStore } from "@/store/store";
import { FilmDetailProps } from "@/types/films";
import { ArrowLeft, Calendar, Heart, User } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilmDetail() {
  const { slug } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const listFilm = useFilmStore(state => state.listFilm)
  const [film, setFilm] = useState<FilmDetailProps | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (slug && listFilm?.length) {
      const foundFilm = listFilm.find(film => {
        return film.id.slice(0, 10) === slug.slice(0, 10)
      });
      setFilm(foundFilm || null);
    }
  }, [slug, listFilm]);

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      const favorites = JSON.parse(localStorage.getItem("favoriteFilms") || "[]");
      setIsFavorite(favorites.includes(slug));
    }
  }, [slug]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteFilms") || "[]");

    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== slug);
      localStorage.setItem("favoriteFilms", JSON.stringify(newFavorites));
    } else {
      favorites.push(slug);
      localStorage.setItem("favoriteFilms", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };


  if (!film) return (
    <div className="my-10 px-8">
      <Error
        message="Can't find your find that you are finding"
        onRetry={() => router.push('/films-list')}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-10 px-4 my-10">
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-4">
          <Button variant="ghost" asChild className="p-2 hover:bg-primary/10 rounded-full">
            <Link href="/films-list">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-center text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-black">{film.title}</h1>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full transition-all ${isFavorite ? "text-destructive border-destructive hover:bg-destructive/10" : "text-muted-foreground"}`}
            onClick={toggleFavorite}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border-t-4 border-t-primary shadow-md">
              <CardHeader className="bg-muted/30">
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-background rounded-full shadow-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    {film.releaseDate}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-background rounded-full shadow-sm">
                    <User className="h-4 w-4 text-primary" />
                    {film.director}
                  </div>
                </div>
                <CardTitle className="text-2xl">Film Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                    <span className="inline-block w-1 h-5 bg-primary rounded-full"></span>
                    Description
                  </h3>
                  <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-lg border border-muted">
                    {film.openingCrawl}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                    <span className="inline-block w-1 h-5 bg-primary rounded-full"></span>
                    Producer
                  </h3>
                  <p className="text-muted-foreground bg-muted/20 p-4 rounded-lg border border-muted">{film.producers}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6 shadow-md border-muted/60 overflow-hidden border-t-4 border-t-black">
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="inline-block w-1 h-4 bg-black rounded-full"></span>
                    Related
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" asChild className="w-full justify-start hover:bg-muted/30 hover:text-primary transition-colors">
                      <Link href="/characters">
                        <User className="h-4 w-4 mr-2" />
                        All Characters
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full justify-start hover:bg-muted/30 hover:text-primary transition-colors">
                      <Link href="/films-list">
                        <Calendar className="h-4 w-4 mr-2" />
                        All Films
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {film && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFilmSchema(film))
          }}
        />
      )}
    </div>
  );
}

