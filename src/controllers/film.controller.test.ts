import { PrismaClient } from "@prisma/client";
import { FilmRepo } from "../repositorio/film.SQL.repo";
import { FilmController } from "./film.controller";
import { NextFunction, type Request, type Response } from "express";

describe("Given a film controller", () => {
  const prismaClient = new PrismaClient();
  const controller = new FilmController(new FilmRepo(prismaClient));
  test("Then it should be instance of the class FilmController", () => {
    expect(controller).toBeInstanceOf(FilmController);
  });
  test("Then it should call the method readAll", async () => {
    const req = {} as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;
    await controller.getsAll(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });
  test("Then it should call the method readById", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;
    await controller.getById(req, res, next);
    expect(res.json(200)).toHaveBeenCalledWith(200);
  });
  test("Then it should call the method create", async () => {
    const req = { body: { titolo: "1" } } as unknown as Request;
    const res = jest.fn() as unknown as Response;
    const next = jest.fn() as NextFunction;
    await controller.create(req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.json(201)).toHaveBeenCalledWith(201);
  });
  test("Then it should call the method update", async () => {
    const req = { body: { id: "1" } } as unknown as Request;
    const res = jest.fn() as unknown as Response;
    const next = jest.fn() as NextFunction;
    await controller.patching(req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.json(201)).toHaveBeenCalledWith(201);
  });
  test("Then it should call the method delete", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = jest.fn() as unknown as Response;
    const next = jest.fn() as NextFunction;
    await controller.erase(req, res, next);
    expect(res.status(200)).toHaveBeenCalledWith(200);
  });
});
