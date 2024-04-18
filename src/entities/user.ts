export type User = {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  password: string;
  role: "admin" | "user" | "guest";
  isMayor18: boolean;
};

export type UserDto = {
  name: string;
  email: string;
  birtdateString: string;
  password: string;
};

export type UserUpdateDto = {
  name?: string;
  email?: string;
  password?: string;
};
