import createDebug from "debug";
import { Serie } from "@prisma/client";
import { BaseController } from "./base.controller.js";
import { SerieCreate } from "../entities/series.js";
import { Repo } from "../entities/type.repo.js";
import { updateSchema, createSchema } from "../entities/film.schema.js";

const debug = createDebug("W7E:users:controller");

export class SerieController2 extends BaseController<Serie, SerieCreate> {
  constructor(protected readonly repo: Repo<Serie, SerieCreate>) {
    super(repo, createSchema, updateSchema);
    debug("Instantiated user controller");
  }
}
