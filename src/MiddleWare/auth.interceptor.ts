import createDebug from "debug";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "./http.error.js";
import { Auth } from "../service/auth.service.js";

const debug = createDebug("W7E:Auth:interceptor");

export class AuthInterceptor {
  constructor() {
    debug("Starting error midleware");
  }

  checkLogin(req: Request, res: Response, next: NextFunction) {
    const data = req.get("authorization");

    const error = new HttpError(498, "Token expired/invalid", "Token invalid");

    if (!data?.startsWith("Bearer")) {
      next(error);
      return;
    }

    const token = data?.slice(7);
    try {
      const payload = Auth.verifyJwT(token);

      req.body.payload = payload;
      next();
    } catch (error) {
      // Error.message
      next(error);
    }
  }
}
