import { PrismaClient } from "@prisma/client";
import { HttpError } from "../MiddleWare/http.error";

import { FilmRepo } from "./film.SQL.repo";

const mockPrisma = {
  film: {
    findMany: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({ id: "1" }),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe("given a instanc of class FilmRepo", () => {
  const repo = new FilmRepo(mockPrisma);
  test("The it should be instance of the class FilmRepo", () => {
    expect(repo).toBeInstanceOf(FilmRepo);
  });
  /* --------------------------------------------------------------- */
  describe("When we use the method readAll", () => {
    test("Then it should call the prisma method findMany()", async () => {
      const result = await repo.readAll();
      expect(mockPrisma.film.findMany).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  test("Then it should call the method readById", async () => {
    const result = await repo.readById("1");
    expect(mockPrisma.film.findUnique).toHaveBeenCalled();
    expect(result).toEqual({ id: "1" });
  });

  test("Then it should call the method readById with wrong ID", async () => {
    (mockPrisma.film.findUnique as jest.Mock).mockResolvedValueOnce(null);
    await expect(repo.readById("2")).rejects.toThrow(
      new HttpError(404, "Not Found", "Film 2 not found!")
    );
  });

  describe("When we use the method create", () => {
    test("Then it should call the method create", async () => {
      (mockPrisma.film.create as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.create({
        titolo: "",
        anno: "",
        regista: "",
        genere: [],
        valutazione: "",
      });
      expect(mockPrisma.film.create).toHaveBeenCalled();
      expect(result).toEqual('[{"id":"1"}]');
    });
  });

  describe("When we use the method update", () => {
    test("Then it should call the method update", async () => {
      (mockPrisma.film.update as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.update("1", {});
      expect(result).toEqual('[{"id":"1"}]');
    });
  });
  describe("when we use the method to delete", () => {
    test("then it should call the method to delete", async () => {
      (mockPrisma.film.delete as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.delete("1");
      expect(result).toEqual('[{"id":"1"}]');
    });
    /* Test("then it should call the method to delete with wrong ID", async () => {
      (mockPrisma.film.delete as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.delete("2")).rejects.toThrow(
        new HttpError(404, "Not Found", "Film 2 not found!")
      );
    }); */
  });
});
