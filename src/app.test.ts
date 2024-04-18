import { PrismaClient } from "@prisma/client";
import { createApp, startApp } from "./app";

describe("given the function create app", () => {
  test("the it should be call app.use", () => {
    const app = createApp();
    jest.spyOn(app, "use");
    const prisma = {} as unknown as PrismaClient;
    startApp(app, prisma);
    expect(app).toBeDefined();
  });
});
