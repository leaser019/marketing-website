import { FilmDetailProps, FilmStore } from "@/types/films";
import { create } from 'zustand';

export const useFilmStore = create<FilmStore>((set) => ({
  listFilm: [],
  addFilm: (film: FilmDetailProps[]) => set((state) => ({listFilm: [...state.listFilm, ...film]}))
}))