import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const signup = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  const token = generateAccessToken({ userId: user.id });

  return { user, token };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  // password check omitted here (you already have it)

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });

  // store refresh token in DB
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { user, accessToken, refreshToken };
};