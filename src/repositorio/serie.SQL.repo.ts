/* eslint-disable no-unused-vars */
import { Serie, PrismaClient } from "@prisma/client";
import createDebug from "debug";

import { HttpError } from "../MiddleWare/http.error.js";
import { SerieCreate, SerieUpdateDto } from "../entities/series.js";

const debug = createDebug("W7E:repository:SQL");

export class SerieRepo {
  constructor(public prisma: PrismaClient) {
    debug("Instanciend fil repo");
  }

  async readAll() {
    const series = await this.prisma.serie.findMany({
      distinct: ["createdAt", "updatetedAt"],
    });
    return series;
  }

  async readById(id: string) {
    const serie = await this.prisma.serie.findUnique({
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
    if (!serie) {
      throw new HttpError(404, "Not found", `Serie ${id} not found!`);
    }

    return serie;
  }

  async create(data: SerieCreate) {
    return this.prisma.serie.create({
      data: {
        titolo: data.titolo,
        episodi: data.episodi,
        regista: data.regista,
        anno: data.anno,
        genere: data.genere,
        valutazione: data.valutazione,
      },
    });
  }

  async update(id: string, data: SerieUpdateDto) {
    const serie = await this.prisma.serie.update({
      where: { id },
      data: {
        valutazione: data.valutazione,
      },
    });
    return serie;
  }

  async delete(id: string) {
    const serie = await this.prisma.serie.delete({
      where: { id },
    });
    return serie;
  }
}
