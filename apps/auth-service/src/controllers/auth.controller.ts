import { signup, login } from "../services/auth.service";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { prisma } from "../lib/prisma";

export const signupHandler = async (req: any, reply: any) => {
  const { email, password } = req.body;

  const result = await signup(email, password);

  return reply.send(result);
};

export const loginHandler = async (req: any, reply: any) => {
  const { email, password } = req.body;

  const result = await login(email, password);

  return reply.send(result);
};

export const refreshHandler = async (req: any, reply: any) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return reply.status(401).send({ message: "No token provided" });
  }

  try {
    const payload: any = verifyRefreshToken(refreshToken);

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!stored) {
      return reply.status(403).send({ message: "Invalid token" });
    }

    // 🔥 TOKEN ROTATION
    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });

    const newAccessToken = generateAccessToken({
      userId: payload.userId,
    });

    const newRefreshToken = generateRefreshToken({
      userId: payload.userId,
    });

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return reply.send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return reply.status(403).send({ message: "Invalid refresh token" });
  }
};