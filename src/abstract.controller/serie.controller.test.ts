import { SerieRepo } from "../repositorio/serie.SQL.repo.js";
import { SerieController2 } from "./serie.controller.2.js";

fdescribe("Given a instance of the class ArticlesController", () => {
  const repo = {
    // Previous readAll: jest.fn(),
    // readById: jest.fn(),
    // create: jest.fn(),
    // update: jest.fn(),
    // delete: jest.fn(),
  } as unknown as SerieRepo;
  const controller = new SerieController2(repo);
  test("Then it should be instance of the class", () => {
    expect(controller).toBeInstanceOf(SerieController2);
  });
});
