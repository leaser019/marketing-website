"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_FILM_BY_ID } from '@/graphql/queries';
import { useQuery } from "@apollo/client";
import { ArrowLeft, Calendar, Heart, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilmDetail() {
  const { slug } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  
  const { data, loading, error } = useQuery(GET_FILM_BY_ID(slug));

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      const favorites = JSON.parse(localStorage.getItem("favoriteFilms") || "[]");
      setIsFavorite(favorites.includes(slug));
    }
  }, [slug]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteFilms") || "[]");
    
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== slug);
      localStorage.setItem("favoriteFilms", JSON.stringify(newFavorites));
    } else {
      favorites.push(slug);
      localStorage.setItem("favoriteFilms", JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };
  
  if (loading) return <FilmDetailSkeleton />;
  if (error) return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-destructive mb-4">Đã xảy ra lỗi!</h2>
      <p className="text-lg mb-6">{error.message}</p>
      <Button asChild>
        <Link href="/films-list">Quay lại danh sách phim</Link>
      </Button>
    </div>
  );
  
  const film = data?.film;
  if (!film) return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Không tìm thấy phim</h2>
      <Button asChild>
        <Link href="/films-list">Quay lại danh sách phim</Link>
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6 gap-4">
        <Button variant="ghost" asChild className="p-2">
          <Link href="/films-list">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{film.title}</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          className={isFavorite ? "text-destructive" : "text-muted-foreground"}
          onClick={toggleFavorite}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {film.releaseDate}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Đạo diễn: {film.director}
                </div>
              </div>
              <CardTitle className="text-xl">Thông tin phim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Mô tả</h3>
                <div className="whitespace-pre-wrap text-muted-foreground">
                  {film.openingCrawl}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Nhà sản xuất</h3>
                <p className="text-muted-foreground">{film.producers}</p>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Nhân vật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {film.characterConnection?.characters?.map((character) => (
              <Card key={character.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{character.name}</CardTitle>
                  <CardDescription>
                    {character.__typename}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">ID:</span> {character.id}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Thông tin thêm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Timeline</h3>
                <div className="bg-muted h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-primary h-full" style={{ width: "60%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">Phần {parseInt(film.id.split(':')[1]) || "?"} trong series</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Liên quan</h3>
                <div className="space-y-2">
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link href="/characters">Tất cả nhân vật</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link href="/films-list">Các phim khác</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FilmDetailSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6 gap-4">
        <div className="h-9 w-9 bg-muted rounded-md"></div>
        <div className="h-8 bg-muted rounded-md w-64"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="flex gap-4 mb-4">
                <div className="h-5 bg-muted rounded-md w-24"></div>
                <div className="h-5 bg-muted rounded-md w-32"></div>
              </div>
              <div className="h-6 bg-muted rounded-md w-40"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="h-6 bg-muted rounded-md w-24 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded-md"></div>
                  <div className="h-4 bg-muted rounded-md"></div>
                  <div className="h-4 bg-muted rounded-md"></div>
                </div>
              </div>
              <div>
                <div className="h-6 bg-muted rounded-md w-32 mb-2"></div>
                <div className="h-4 bg-muted rounded-md w-40"></div>
              </div>
            </CardContent>
          </Card>
          
          <div className="h-8 bg-muted rounded-md w-40 mt-8 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-5 bg-muted rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded-md w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded-md"></div>
                    <div className="h-4 bg-muted rounded-md"></div>
                    <div className="h-4 bg-muted rounded-md"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded-md w-32"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="h-5 bg-muted rounded-md w-24 mb-2"></div>
                <div className="h-2 bg-muted rounded-full mb-2"></div>
                <div className="h-4 bg-muted rounded-md w-36"></div>
              </div>
              <div>
                <div className="h-5 bg-muted rounded-md w-24 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-9 bg-muted rounded-md"></div>
                  <div className="h-9 bg-muted rounded-md"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}