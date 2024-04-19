import { FilmController2 } from "../controllers/film.controller.2";
import { FilmRouter } from "./film.router";

describe("given a instanc of class FilmRouter", () => {
  const controller = {
    getsAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    patching: jest.fn(),
    erase: jest.fn(),
  } as unknown as FilmController2;
  const router = new FilmRouter(controller);
  test("The it should be instance of the class FilmRouter", () => {
    expect(router).toBeInstanceOf(FilmRouter);
  });
});
