import { Router as createRouter } from "express";
import createDebug from "debug";
import { FilmController2 } from "../controllers/film.controller.2";

const debug = createDebug("W7E:router:film");

export class FilmRouter {
  router = createRouter();
  constructor(private readonly controller: FilmController2) {
    debug("starting router");
    this.router.get("/", controller.getsAll.bind(controller));
    this.router.get("/:id", controller.getById.bind(controller));
    this.router.post("/", controller.create.bind(controller));
    this.router.patch("/:id", controller.update.bind(controller));
    this.router.delete("/:id", controller.delete.bind(controller));
  }
}
