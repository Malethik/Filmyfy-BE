import express from "express";
import { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import createDebug from "debug";
import { FilmRouter } from "./routers/film.router.js";
import { ErrorsMidleware } from "./MiddleWare/error.middleware.js";
import { PrismaClient } from "@prisma/client";
import { FilmRepo } from "./repositorio/film.SQL.repo.js";
import { AuthInterceptor } from "./MiddleWare/auth.interceptor.js";
import { SerieRepo } from "./repositorio/serie.SQL.repo.js";
import { SerieController2 } from "./controllers/serie.controller.2.js";
import { SerieRouter } from "./routers/serie.router.js";
import { UserRouter } from "./routers/user.router.js";
import { FilmController2 } from "./controllers/film.controller.2.js";
import { UserRepo } from "./repositorio/user.sql.repo.js";
import { UserController } from "./controllers/user.controller.js";

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

  const authInterceptor = new AuthInterceptor(); // Metterlo nel router

  const filmRepoSQL = new FilmRepo(prisma);
  const filmController = new FilmController2(filmRepoSQL);
  const filmRouter = new FilmRouter(filmController);
  app.use("/film", filmRouter.router);

  const serieRepoSQL = new SerieRepo(prisma);
  const serieController = new SerieController2(serieRepoSQL);
  const serieRouter = new SerieRouter(serieController);
  app.use("/serie", serieRouter.router);

  const userRepo = new UserRepo(prisma);
  const userController = new UserController(userRepo);
  const userRouter = new UserRouter(userController, authInterceptor);
  app.use("/user", userRouter.router);

  const errormiddleware = new ErrorsMidleware();
  app.use(errormiddleware.handle.bind(errormiddleware));
};
