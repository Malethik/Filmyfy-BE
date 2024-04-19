/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";
import createDebug from "debug";

import { HttpError } from "../MiddleWare/http.error.js";
import { User, UserCreateDto } from "../entities/user.js";
import { WithLoginRepo } from "../model/type.repo.js";

const debug = createDebug("W7E:repository:user:SQL");
const select = {
  id: true,
  name: true,
  email: true,
  birthDate: true,
  role: true,
  isMayor18: true,
  comments: {
    select: {
      id: true,
      title: true,
      content: true,
    },
  },
};

export class UserRepo implements WithLoginRepo<User, UserCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug("Instanciend user repo");
  }

  async readAll() {
    return this.prisma.user.findMany({
      select,
    });
  }

  async readById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });
    if (!user) {
      throw new HttpError(404, "Not found", `User ${id} not found!`);
    }

    return user;
  }

  async searchForLogin(key: "email" | "name", value: string) {
    if (!["email", "name"].includes(key)) {
      throw new HttpError(404, "Not Found", "Invalid parameter");
    }

    const userData = await this.prisma.user.findFirst({
      where: {
        [key]: value,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });
    if (!userData) {
      throw new HttpError(404, "Not Found", `Invalid ${key} or password`);
    }

    return userData;
  }

  async create(data: UserCreateDto) {
    const { birthDateString, ...rest } = data;
    const newUser = this.prisma.user.create({
      data: {
        role: "USER",
        birthDate: new Date(birthDateString),
        isMayor18: true,
        ...rest,
      },
      select,
    });
    return newUser;
  }

  async update(id: string, data: Partial<UserCreateDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpError(404, "Not Found", `user ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpError(404, "Not Found", `user ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
      select,
    });
  }
}
