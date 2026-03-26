import Fastify from "fastify";

const app = Fastify();

app.get("/", async () => {
  return { message: "API Gateway running" };
});

app.listen({ port: 3001 }, () => {
  console.log("Gateway running on 3001");
});