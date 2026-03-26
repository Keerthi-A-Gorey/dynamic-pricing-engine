import Redis from "ioredis";

const redis = new Redis();

await redis.set("test", "hello");
console.log(await redis.get("test"));