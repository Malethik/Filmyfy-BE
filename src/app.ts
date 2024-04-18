/* eslint-disable no-unused-vars */
import express from "express";
import { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import createDebug from "debug";
import { FilmRouter } from "./routers/film.router.js";
import { FilmRepository } from "./repositorio/film.repo.js";
import { FilmController } from "./controllers/film.controller.js";
import { ErrorsMidleware } from "./MiddleWare/error.middleware.js";
import { PrismaClient } from "@prisma/client";
import { FilmRepo } from "./repositorio/film.SQL.repo.js";

const debug = createDebug("W7E:app");

export const createApp = () => {
  debug("Creating app");
  const app = express();

  return app;
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug("Starting app");
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.static("./public"));
  const filmRepoSQL = new FilmRepo(prisma);
  const filmRepo = new FilmRepository();
  const filmController = new FilmController(filmRepoSQL);
  const filmRouter = new FilmRouter(filmController);
  app.use("/film", filmRouter.router);

  const errormiddleware = new ErrorsMidleware();
  app.use(errormiddleware.handle.bind(errormiddleware));
};
