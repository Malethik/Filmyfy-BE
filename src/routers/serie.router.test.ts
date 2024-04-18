import { SerieRouter } from "./serie.router";
import { SerieController } from "../controllers/serie.controller";

describe("given a instanc of class SerieRouter", () => {
  const controller = {
    getsAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    patching: jest.fn(),
    erase: jest.fn(),
  } as unknown as SerieController;
  const router = new SerieRouter(controller);
  test("The it should be instance of the class SerieRouter", () => {
    expect(router).toBeInstanceOf(SerieRouter);
  });
});
