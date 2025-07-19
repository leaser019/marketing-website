import { gql } from '@apollo/client';

export const GET_ALL_FILMS = gql`
  query GetAllFilms {
  allFilms {
    films {
      created
      director
      edited
      episodeID
      id
      openingCrawl
      producers
      releaseDate
      title
    }
  }
}
`;

export const GET_FILM_BY_ID = (slug: string) => 
  (slug ? gql`
    query GetFilmById($id: ID!) {
      film(id: $id) {
        created
        director
        edited
        episodeID
        id
        openingCrawl
        producers
        releaseDate
        title
        characterConnection {
          characters {
            id
            name
          }
        }
      }
    }
  ` : gql`query GetFilmById {}`);
  
export const GET_ALL_CHARACTERS = gql`
 query GetAllCharacters {
   allPeople {
    people {
      id
      name
    }
  }
}
`;