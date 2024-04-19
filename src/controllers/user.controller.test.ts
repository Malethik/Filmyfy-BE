import { UserRepo } from "../repositorio/user.sql.repo.js";

import { UserController } from "./user.controller.js";

fdescribe("Given a instance of the class ArticlesController", () => {
  const mock = {
    readAll: jest.fn(),
    readById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as UserRepo;
  const controller = new UserController(mock);
  test("Then it should be instance of the class", () => {
    expect(controller).toBeInstanceOf(UserController);
  });
});
