import { readFile } from "fs/promises";
import { FilmRepository } from "./film.repo";
import { HttpError } from "../MiddleWare/http.error";
import { FilmCreate } from "../entities/film";

jest.mock("fs/promises");

describe("given a instanc of class FilmRepo", () => {
  const repo = new FilmRepository();

  test("The it should be instance of the class FilmRepo", () => {
    expect(repo).toBeInstanceOf(FilmRepository);
  });

  describe("When we use the method readAll", () => {
    test("Then it should call the method readFile", async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.readAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
    test("Then it should call the method readFile", async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.readAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([{ id: "1" }]);
    });
  });

  describe("When we use the method readById", () => {
    test("Then it should call the method readById", async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.readById("1");
      expect(result).toEqual({ id: "1" });
    });
  });

  describe("When we use the method readById with invalid ID", () => {
    test("Then it should call the method readById with wrong ID", async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      await expect(repo.readById("2")).rejects.toThrow(
        new HttpError(404, "Film 2 not found")
      );
    });
  });

  describe("When we use the method create", () => {
    test("Then it should call the method create", async () => {
      const data = {} as unknown as FilmCreate;
      const result = await repo.create(data);
      expect(result).toEqual({ id: expect.any(String) });
      expect(readFile).toHaveBeenCalled();
    });
  });

  describe("When we use the method update", () => {
    test("Then it should call the method update", async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.update("1", {});
      expect(result).toEqual({ id: "1" });
    });
  });
  describe("when we use the method to delete", () => {
    test("then it should call the method to delete", async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const result = await repo.delete("1");
      expect(result).toEqual({ id: "1" });
    });
    test("then it should call the method to delete with wrong ID", async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      await expect(repo.delete("2")).rejects.toThrow(
        new HttpError(404, "Film 2 not found")
      );
    });
  });
});
