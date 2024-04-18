import { Router as createRouter } from "express";
import createDebug from "debug";
import { type FilmController } from "../controllers/film.controller";

const debug = createDebug("W7E:router:film");

export class FilmRouter {
  router = createRouter();
  constructor(private readonly controller: FilmController) {
    debug("starting router");
    this.router.get("/", controller.getsAll.bind(controller));
    this.router.get("/:id", controller.getById.bind(controller));
    this.router.post("/", controller.create.bind(controller));
    this.router.patch("/:id", controller.patching.bind(controller));
    this.router.delete("/:id", controller.erase.bind(controller));
  }
}
