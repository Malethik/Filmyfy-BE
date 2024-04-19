import { Router as createRouter } from "express";
import createDebug from "debug";
import { SerieController2 } from "../controllers/serie.controller.2";

const debug = createDebug("W7E:router:film");

export class SerieRouter {
  router = createRouter();
  constructor(private readonly controller: SerieController2) {
    debug("starting router");
    this.router.get("/", controller.getsAll.bind(controller));
    this.router.get("/:id", controller.getById.bind(controller));
    this.router.post("/", controller.create.bind(controller));
    this.router.patch("/:id", controller.update.bind(controller));
    this.router.delete("/:id", controller.delete.bind(controller));
  }
}
