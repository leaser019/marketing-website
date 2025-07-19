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
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);
  const { ref, inView } = useInView();
  
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
    variables: { first: 12, after: null }
  });

  useEffect(() => {
    if (data?.allPeople?.edges) {
      const characters = data.allPeople.edges.map((edge: {
        node: {
          id: string,
          name: string
      }}) => ({
        id: edge.node.id,
        name: edge.node.name,
        __typename: 'Person'
      }));
      
      setDisplayedCharacters(characters.filter((char : { id: string, name: string }) => 
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [data, searchTerm]);
  
  useEffect(() => {
    if (inView && !loading && data?.allPeople?.pageInfo?.hasNextPage) {
      loadMore();
    }
  }, [inView, loading]);
  
  const loadMore = useCallback(() => {
    if (!data?.allPeople?.pageInfo?.hasNextPage) return;
    
    fetchMore({
      variables: {
        first: 12,
        after: data.allPeople.pageInfo.endCursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          allPeople: {
            __typename: prev.allPeople.__typename,
            pageInfo: fetchMoreResult.allPeople.pageInfo,
            edges: [
              ...prev.allPeople.edges,
              ...fetchMoreResult.allPeople.edges
            ]
          }
        };
      }
    });
  }, [data, fetchMore]);
  
  if (loading && !displayedCharacters.length) return <CharactersGridSkeleton />;
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
          <Button variant="outline" onClick={() => setSearchTerm("")}>View all characters</Button>
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
          
          {!searchTerm && data?.allPeople?.pageInfo?.hasNextPage && (
            <div ref={ref}>
                {loading ? (
                    <>
                       <span className="flex justify-center py-8 mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    Loading...
                  </>
                ) : (
                  <CharactersGridSkeleton />
                )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

