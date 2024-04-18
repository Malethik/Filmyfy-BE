export interface SerieCreate {
  titolo: string;
  episodi: string;
  anno: string;
  regista: string;
  genere: string[];
  valutazione: string;
}
export type SerieUpdateDto = {
  titolo?: string;
  anno?: string;
  regista?: string;
  genere?: string[];
  valutazione?: string;
};
