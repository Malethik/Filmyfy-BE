import { Request, Response } from "express";
import { AuthInterceptor } from "./auth.interceptor";
import { Auth } from "../service/auth.service";

describe("Given a instance of class interceptor", () => {
  const interceptor = new AuthInterceptor();
  const req = {
    body: {},
    get: jest.fn().mockReturnValue("bearer token"),
  } as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  describe("When i use method and token is valid", () => {
    Auth.verifyJwT = jest.fn().mockReturnValue({ id: 123 });

    test("", () => {
      expect(interceptor).toBeInstanceOf(AuthInterceptor);
    });
    test("", () => {
      interceptor.authentication(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(req.body.payload).toEqual({ id: "123" });
      expect(Auth.verifyJwT).toHaveBeenCalled();
    });
  });

  describe("when i use the method and token is not valid", () => {
    Auth.verifyJwT = jest.fn().mockImplementation(() => {
      throw new Error("invalid token");
    });
    test("when i use the method and token is not valid", () => {
      interceptor.authentication(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("Invalid Token"));
    });
    test("when i use the method and token is not valid", () => {
      interceptor.authentication(req, res, next);
      expect(next).toHaveBeenCalledWith({
        mssage: "Token Invalid",
        status: 498,
        title: "Token expired/invalid",
      });
    });
  });
});
