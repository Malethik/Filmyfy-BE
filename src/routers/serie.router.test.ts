import { SerieRouter } from "./serie.router";

import { SerieController2 } from "../controllers/serie.controller.2";

describe("given a instanc of class SerieRouter", () => {
  const controller = {
    getsAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    patching: jest.fn(),
    erase: jest.fn(),
  } as unknown as SerieController2;
  const router = new SerieRouter(controller);
  test("The it should be instance of the class SerieRouter", () => {
    expect(router).toBeInstanceOf(SerieRouter);
  });
});
