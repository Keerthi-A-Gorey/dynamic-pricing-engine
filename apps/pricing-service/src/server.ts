import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

app.get('/', async () => {
  return { message: 'API Gateway running' };
});

const start = async () => {
  try {
    await app.listen({ port: 3001 });
    console.log('Server running on port 3001');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();