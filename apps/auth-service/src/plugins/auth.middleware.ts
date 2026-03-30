import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    (req as any).user = decoded;
  } catch {
    return reply.status(401).send({ message: "Invalid token" });
  }
};