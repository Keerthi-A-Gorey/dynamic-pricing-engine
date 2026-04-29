import { FastifyInstance } from "fastify";
import { predictFromML } from "../services/ml.service";

export default async function (fastify: FastifyInstance) {
  fastify.get("/predict-price", async (request, reply) => {
    const { demand, supply, time } = request.query as {
      demand: string;
      supply: string;
      time: string;
    };

    if (!demand || !supply || !time) {
      return reply.status(400).send({
        error: "Missing required query params"
      });
    }

    const data = {
      demand: Number(demand),
      supply: Number(supply),
      time: Number(time)
    };

    const mlResponse = await predictFromML(data);

    return {
      price: mlResponse.predicted_price,
      confidence: mlResponse.confidence,
      model_version: mlResponse.model_version
    };
  });
}