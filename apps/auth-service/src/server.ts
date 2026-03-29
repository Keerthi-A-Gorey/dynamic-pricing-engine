import Fastify from "fastify";
import { authRoutes } from "./routes/auth.routes";

const app = Fastify({ logger: true });

app.register(authRoutes, { prefix: "/auth" });

app.get("/", async () => {
  return { message: "Auth Service Running" };
});

const start = async () => {
  try {
    await app.listen({ port: 3002 });
    console.log("Auth service running on 3002");

    await app.ready();
    console.log(app.printRoutes());
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();