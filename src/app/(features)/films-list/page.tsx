"use client";

import { GET_ALL_FILMS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Calendar, User } from "lucide-react";

export default function FilmList() {
  const { data, loading, error } = useQuery(GET_ALL_FILMS);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  
  if (loading) return <FilmsListSkeleton />;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h2 className="text-2xl font-bold text-destructive mb-4">Ôi không!</h2>
      <p className="text-lg text-muted-foreground text-center max-w-lg">
        Đã xảy ra lỗi khi tải dữ liệu: {error.message}. Xin thử lại sau!
      </p>
      <Button className="mt-6" onClick={() => window.location.reload()}>
        Thử lại
      </Button>
    </div>
  );
  
  const films = [...(data?.allFilms?.films || [])];
  
  // Sắp xếp phim
  if (sortBy === "date") {
    films.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
  } else {
    films.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Danh sách phim Star Wars</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Sắp xếp theo ngày
          </Button>
          <Button
            variant={sortBy === "title" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("title")}
          >
            <User className="h-4 w-4 mr-1" />
            Sắp xếp theo tên
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
                <div className="mt-1">Đạo diễn: {film.director}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-4 text-sm text-muted-foreground">{film.openingCrawl}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/films-list/${film.id}`}>Xem chi tiết</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FilmsListSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="h-8 bg-muted rounded-md w-64"></div>
        <div className="flex items-center gap-2">
          <div className="h-9 bg-muted rounded-md w-32"></div>
          <div className="h-9 bg-muted rounded-md w-32"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-7 bg-muted rounded-md w-3/4 mb-2"></div>
              <div className="h-5 bg-muted rounded-md w-1/2 mb-1"></div>
              <div className="h-5 bg-muted rounded-md w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 bg-muted rounded-md w-4/5"></div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-muted rounded-md w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}