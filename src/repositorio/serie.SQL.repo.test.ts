import { PrismaClient } from "@prisma/client";
import { HttpError } from "../MiddleWare/http.error";
import { SerieRepo } from "./serie.SQL.repo";

const mockPrisma = {
  serie: {
    findMany: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({ id: "1" }),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe("given a instanc of class SerieRepo", () => {
  const repo = new SerieRepo(mockPrisma);
  test("The it should be instance of the class Serierepo", () => {
    expect(repo).toBeInstanceOf(SerieRepo);
  });
  /* --------------------------------------------------------------- */
  describe("When we use the method readAll", () => {
    test("Then it should call the prisma method findMany()", async () => {
      const result = await repo.readAll();
      expect(mockPrisma.serie.findMany).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  test("Then it should call the method readById", async () => {
    const result = await repo.readById("1");
    expect(mockPrisma.serie.findUnique).toHaveBeenCalled();
    expect(result).toEqual({ id: "1" });
  });

  test("Then it should call the method readById with wrong ID", async () => {
    (mockPrisma.serie.findUnique as jest.Mock).mockResolvedValueOnce(null);
    await expect(repo.readById("2")).rejects.toThrow(
      new HttpError(404, "Not Found", "Serie 2 not found!")
    );
  });

  describe("When we use the method create", () => {
    test("Then it should call the method create", async () => {
      (mockPrisma.film.create as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.create({
        anno: "",
        episodi: "",
        genere: [],
        regista: "",
        titolo: "",
        valutazione: "",
      });
      expect(mockPrisma.film.create).toHaveBeenCalled();
      expect(result).toEqual('[{"id":"1"}]');
    });
  });

  describe("When we use the method update", () => {
    test("Then it should call the method update", async () => {
      (mockPrisma.serie.update as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.update("1", {});
      expect(result).toEqual('[{"id":"1"}]');
    });
  });
  describe("when we use the method to delete", () => {
    test("then it should call the method to delete", async () => {
      (mockPrisma.serie.delete as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.delete("1");
      expect(result).toEqual('[{"id":"1"}]');
    });
   
  });
});
