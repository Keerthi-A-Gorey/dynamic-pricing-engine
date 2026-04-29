import Fastify from "fastify";
import predictRoute from "./routes/predict.route";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

const start = async () => {
  try {
    // ✅ register plugins INSIDE async function
    await app.register(cors, {
      origin: true,
    });

    // routes
    app.register(predictRoute, { prefix: "/api" });

    await app.listen({ port: 3000 });

    console.log("🚀 Server running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();