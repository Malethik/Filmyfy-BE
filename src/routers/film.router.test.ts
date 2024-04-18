import { FilmRouter } from "./film.router";
import { FilmController } from "../controllers/film.controller";

describe("given a instanc of class FilmRouter", () => {
  const controller = {
    getsAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    patching: jest.fn(),
    erase: jest.fn(),
  } as unknown as FilmController;
  const router = new FilmRouter(controller);
  test("The it should be instance of the class FilmRouter", () => {
    expect(router).toBeInstanceOf(FilmRouter);
  });
});
