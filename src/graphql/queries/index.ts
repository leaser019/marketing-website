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

export const GET_FILM_BY_ID = (slug: String) => 
  (slug ? gql`
    query GetFilmById {
      film(id: "${slug}") {
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
  ` : gql``);

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