import createDebug from "debug";
import { Film, FilmCreate } from "../entities/film.js";
import { readFile, writeFile } from "fs/promises";
import { HttpError } from "../MiddleWare/http.error.js";

const debug = createDebug("W7E:repository:film");

export class FilmRepository {
  constructor() {
    debug("Instancied repository!");
    this.loadDb();
  }

  private async loadDb(): Promise<Film[]> {
    const data = await readFile("db.json", "utf-8");
    return JSON.parse(data) as Film[];
  }

  private async saveDb(film: Film[]) {
    await writeFile("db.json", JSON.stringify(film, null, 2));
  }

  async readAll() {
    const result = await this.loadDb();
    return result;
  }

  async readById(id: string) {
    const films = await this.loadDb();
    const film = films.find((film) => film.id === id);
    if (!film) {
      throw new HttpError(404, `Film ${id} not found`);
    }

    return film;
  }

  async create(datos: FilmCreate) {
    const newFilm: Film = {
      id: crypto.randomUUID(),
      ...datos,
    };
    let films = await this.loadDb();
    films = [...films, newFilm];
    await this.saveDb(films);
    return newFilm;
  }

  async update(id: string, data: Partial<Film>) {
    let films = await this.loadDb();
    const film = films.find((film) => film.id === id);
    if (!film) {
      throw new HttpError(404, "not found", `User ${id} not found`);
    }

    const newFilm: Film = { ...film, ...data };
    films = films.map((film) => (film.id === id ? newFilm : film));
    await this.saveDb(films);
    return newFilm;
  }

  async delete(id: string) {
    let films = await this.loadDb();
    const film = films.find((film) => film.id === id);
    if (!film) {
      throw new HttpError(404, "not found", `User ${id} not found`);
    }

    films = films.filter((film) => film.id !== id);
    await this.saveDb(films);
    return film;
  }
}
