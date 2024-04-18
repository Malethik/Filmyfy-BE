export interface Root {
  film: Film[];
}

export interface Film {
  id: string;
  titolo: string;
  anno: string;
  regista: string;
  genere: string[];
  valutazione: string;
}
export interface FilmCreate {
  titolo: string;
  anno: string;
  regista: string;
  genere: string[];
  valutazione: string;
}
export interface FilmUpdate {
  titolo?: string;
  anno?: string;
  regista?: string;
  genere?: string[];
  valutazione?: string;
}
