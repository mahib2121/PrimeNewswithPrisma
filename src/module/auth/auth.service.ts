import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    config.jwt_access!,
    { expiresIn: "30d" },
  );
  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    config.jwt_refresh!,
    { expiresIn: "30d" },
  );
  return { accessToken, refreshToken };
};

export const authService = {
  loginUser,
};
