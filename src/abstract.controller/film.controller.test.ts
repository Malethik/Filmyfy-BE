import { FilmRepo } from "../repositorio/film.SQL.repo.js";
import { FilmController2 } from "./film.controller.2.js";

fdescribe("Given a instance of the class ArticlesController", () => {
  const repo = {
    // Previous readAll: jest.fn(),
    // readById: jest.fn(),
    // create: jest.fn(),
    // update: jest.fn(),
    // delete: jest.fn(),
  } as unknown as FilmRepo;
  const controller = new FilmController2(repo);
  test("Then it should be instance of the class", () => {
    expect(controller).toBeInstanceOf(FilmController2);
  });
});
