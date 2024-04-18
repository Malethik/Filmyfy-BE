/* eslint-disable no-unused-vars */
import { NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import { Serie } from "@prisma/client";

import { createSchema, updateSchema } from "../entities/film.schema.js";
import { HttpError } from "../MiddleWare/http.error.js";
import { SerieRepo } from "../repositorio/serie.SQL.repo.js";

const debug = createDebug("W7E:controller:serie");

export class SerieController {
  constructor(private readonly repo: SerieRepo) {
    this.repo = repo;
    debug("Instancied controller");
  }

  async getsAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.status(200);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }

    try {
      const result = await this.repo.readById(id);
      res.status(200);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Serie;

    const { error, value } = createSchema.validate(data, {
      abortEarly: false,
    });
    if (error) {
      next(new HttpError(406, "not acceptable", error.message));
      return;
    }

    try {
      const result = await this.repo.create(data);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  patching(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body as Serie;
    const { error } = updateSchema.validate(data, {
      abortEarly: false,
    });
    if (error) {
      next(new HttpError(406, "Not Acceptable", error.message));
      return;
    }

    try {
      const result = this.repo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async erase(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.delete(id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}
