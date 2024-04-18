export type User = {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  password?: string;
  role: "ADMIN" | "USER" | "GUEST";
  isMayor18?: boolean;
  comments?: Partial<Comment[]>;
};

export type UserCreateDto = {
  name: string;
  email: string;
  birthDateString: string;
  password: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;
