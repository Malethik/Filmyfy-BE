/* eslint-disable no-unused-vars */
import { Film, PrismaClient } from "@prisma/client";
import createDebug from "debug";
import { HttpError } from "../MiddleWare/http.error.js";
import { FilmCreate, FilmUpdate } from "../entities/film.js";

const debug = createDebug("W7E:repository:SQL");

export class FilmRepo {
  constructor(public prisma: PrismaClient) {
    debug("Instanciend fil repo");
  }

  async readAll() {
    const films = await this.prisma.film.findMany({
      distinct: ["createdAt", "updatetedAt"],
    });
    return films;
  }

  async readById(id: string) {
    const film = await this.prisma.film.findUnique({
      where: { id },
      select: {
        id: true,
        titolo: true,
        regista: true,
        anno: true,
        genere: true,
        valutazione: true,
      },
    });
    if (!film) {
      throw new HttpError(404, "Not found", `Film ${id} not found!`);
    }

    return film;
  }

  async create(data: FilmCreate) {
    return this.prisma.film.create({
      data: {
        titolo: data.titolo,
        regista: data.regista,
        anno: data.anno,
        genere: data.genere,
        valutazione: data.valutazione,
      },
    });
  }

  async update(id: string, data: FilmUpdate) {
    const film = await this.prisma.film.update({
      where: { id },
      data: {
        titolo: data.titolo,
        regista: data.regista,
        anno: data.anno,
        genere: data.genere,
        valutazione: data.valutazione,
      },
    });
    return film;
  }

  async delete(id: string) {
    const film = await this.prisma.film.delete({
      where: { id },
    });
    return film;
  }
}
