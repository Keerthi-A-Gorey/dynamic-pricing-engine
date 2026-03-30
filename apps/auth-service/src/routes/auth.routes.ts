import { FastifyInstance } from "fastify";
import { signupHandler, loginHandler, refreshHandler } from "../controllers/auth.controller";
import { authMiddleware } from "../plugins/auth.middleware";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signup", signupHandler);
  app.post("/login", loginHandler);
  app.post("/refresh", refreshHandler);
  app.get(
  "/me",
  { preHandler: authMiddleware },
  async (req: any) => {
    return { user: req.user };
  }
);
}