import { type Request, type Response } from "express";
import { ErrorsMidleware } from "./error.middleware.js";
import { HttpError } from "./http.error.js";

const req = {} as unknown as Request;
const res = {
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;
const next = jest.fn();

describe("Given a instance of the class ErrorsMiddleware", () => {
  const middleware = new ErrorsMidleware();
  test("Then it should be instance of the class", () => {
    expect(middleware).toBeInstanceOf(ErrorsMidleware);
  });
  describe("When we use the method handle with a HttpError", () => {
    test("Then it should call res.status 404", () => {
      const error = new HttpError(404, "Not Found", "Article not found");
      middleware.handle(error, req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When we use the method handle with a Error", () => {
    test("Then it should call res.status with 500", () => {
      const error = new Error("Something went wrong");
      middleware.handle(error, req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
