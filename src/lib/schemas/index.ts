export function generateFilmSchema(film: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": film.title,
    "director": {
      "@type": "Person",
      "name": film.director
    },
    "datePublished": film.releaseDate,
    "description": film.openingCrawl?.substring(0, 200) + "...",
    "producer": film.producers?.join(", ")
  };
}