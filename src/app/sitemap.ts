import { GET_ALL_FILMS } from "@/graphql/queries";
import { getClient } from "@/lib/apolloClient";
import { FilmDetailProps } from "@/types/films";
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://start-war-graghql.vercel.app/';
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/films-list`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/characters`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ];

  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_ALL_FILMS
    });

    const filmPages = data?.allFilms?.films.map((film: FilmDetailProps) => ({
      url: `${baseUrl}/films-list/${film.id}`,
      lastModified: new Date(film.edited || film.created),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })) || [];

    return [...staticPages, ...filmPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}