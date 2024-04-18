/* eslint-disable no-unused-vars */
import { NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Joi from "joi";

import { HttpError } from "../MiddleWare/http.error.js";
import { Repo } from "../repositorio/type.repo.js";

const debug = createDebug("W7E:base:controller");

export abstract class BaseController<T, C> {
  constructor(
    protected readonly repo: Repo<T, C>,
    protected createDtoSchema: Joi.ObjectSchema<C>,
    protected updateDtoSchema: Joi.ObjectSchema<C>
  ) {
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
    const data = req.body as C;

    const { error, value }: { error: Error | undefined; value: C } =
      this.createDtoSchema.validate(data, {
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
    const data = req.body as C;
    const { error } = this.updateDtoSchema.validate(data, {
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
