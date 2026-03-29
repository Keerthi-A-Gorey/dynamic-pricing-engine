import { FastifyInstance } from "fastify";
import { signupHandler, loginHandler } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signup", signupHandler);
  app.post("/login", loginHandler);
}