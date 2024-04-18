import createDebug from "debug";

import { BaseController } from "./base.controller.js";

import { Repo } from "../entities/type.repo.js";
import { updateSchema, createSchema } from "../entities/film.schema.js";
import { Film, FilmCreate } from "../entities/film.js";

const debug = createDebug("W7E:users:controller");

export class FilmController2 extends BaseController<Film, FilmCreate> {
  constructor(protected readonly repo: Repo<Film, FilmCreate>) {
    super(repo, createSchema, updateSchema);
    debug("Instantiated user controller");
  }
}
