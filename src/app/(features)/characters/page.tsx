"use client";

import { Error } from "@/components/common/Error";
import { CharactersGridSkeleton } from '@/components/common/Skeleton';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_ALL_CHARACTERS } from "@/graphql/queries";
import { Character } from "@/types/characters";
import { useQuery } from "@apollo/client";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Characters() {
  const { data, loading, error } = useQuery(GET_ALL_CHARACTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const charactersPerPage = 12;
  const { ref, inView } = useInView();
  
  useEffect(() => {
    if (!data?.allPeople?.people) return;
    
    const filtered = data.allPeople.people.filter(char => 
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (searchTerm) {
      setDisplayedCharacters(filtered.slice(0, charactersPerPage));
      setPage(1);
    } else {
      setDisplayedCharacters(filtered.slice(0, page * charactersPerPage));
    }
  }, [data, searchTerm, page]);
  
  useEffect(() => {
    if (inView && !loading && !searchTerm) {
      loadMore();
    }
  }, [inView, loading]);
  
  const loadMore = useCallback(() => {
    if (!data?.allPeople?.people) return;
    
    const filtered = data.allPeople.people.filter(char => 
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const nextPage = page + 1;
    const hasMore = nextPage * charactersPerPage < filtered.length;
    
    if (hasMore) {
      setDisplayedCharacters(filtered.slice(0, nextPage * charactersPerPage));
      setPage(nextPage);
    }
  }, [data, page, searchTerm]);
  
  if (loading) return <CharactersGridSkeleton />;
  if (error) return (
      <div className="m-10 p-15"><Error message={error.message} /></div>
  );

  return (
    <div className="container mx-auto py-10 px-4 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Star Wars Characters</h1>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Find Characters..."
            className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {displayedCharacters.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">Can not find any character</h3>
          <p className="text-muted-foreground mb-6">Try to find another one</p>
          <Button variant="outline" onClick={() => setSearchTerm("")}>Watch all character</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedCharacters.map((character: Character) => (
              <Card key={character.id} className="transition-transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>{character.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Type:</span> {character.__typename}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {!searchTerm && displayedCharacters.length < (data?.allPeople?.people?.length || 0) && (
            <div className="py-8 flex justify-center" ref={ref}>
              <Button variant="outline" onClick={loadMore} disabled={loading}>
                {loading ? "Loading..." : "More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

