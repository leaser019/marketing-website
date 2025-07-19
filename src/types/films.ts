export interface FilmDetailProps {
  created: Date,
  director: string,
  edited: Date,
  episodeID: number,
  id: string,
  openingCrawl: string,
  producers: string[],
  releaseDate: String,
  title: String,
  __typename: String
}

export interface FilmStore {
  listFilm: FilmDetailProps[];
  addFilm: (film: FilmDetailProps[]) => void;
}
