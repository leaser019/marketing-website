'use client';

import { GET_ALL_FILMS } from '@/graphql/queries';
import { cn } from '@/lib/utils';
import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface Film {
  id: string;
  title: string;
  episodeID: number;
  releaseDate: string;
  director: string;
  openingCrawl: string;
}

export default function FilmsList() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_FILMS);
  const [searchTerm, setSearchTerm] = useState('');

  // Xử lý loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="animate-pulse flex flex-col gap-4 w-full max-w-4xl">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          ))}
        </div>
        <p className="mt-6 text-gray-500 dark:text-gray-400">Loading films...</p>
      </div>
    );
  }

  // Xử lý error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-red-500 dark:text-red-400 text-xl mb-4">Error loading films</div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'Something went wrong. Please try again.'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  // Sort films by episode number
  const films = [...(data?.allFilms?.films || [])].sort(
    (a: Film, b: Film) => a.episodeID - b.episodeID
  );

  // Filter films based on search
  const filteredFilms = films.filter((film: Film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search films by title..."
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFilms.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No films found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredFilms.map((film: Film, index: number) => (
            <motion.div
              key={film.id}
              data-testid="film-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow",
                "dark:border-gray-700 bg-white dark:bg-gray-800"
              )}
            >
              <Link href={`/films/${film.id}`} className="block p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{film.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Episode {film.episodeID} • Directed by {film.director} • Released {new Date(film.releaseDate).getFullYear()}
                    </p>
                    <p className="line-clamp-3 text-gray-700 dark:text-gray-300">
                      {film.openingCrawl}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                    <span className="text-3xl font-bold text-yellow-500">
                      {film.episodeID}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
