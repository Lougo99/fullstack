export interface Film {
  id: number;
  titre: string;
  realisateur: string;
  dateSortie: string;
  genre: string;
  acteursIds?: number[];
}

export interface FilmCreation {
  titre: string;
  realisateur: string;
  dateSortie: string;
  genre: string;
  acteursIds?: number[];
}
