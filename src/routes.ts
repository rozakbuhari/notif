import { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return {
      statusCode: 200,
      message: 'OK',
      uptime: process.uptime(),
    };
  });

  fastify.get('/notifications', async (request, reply) => {
    return { notifications: [] };
  });

  fastify.post('/notifications', async (request) => {
    const { redis } = fastify;

    await redis['publisher'].publish(
      'notifications',
      JSON.stringify(request.body)
    );

    return { ok: true };
  });
}

export default routes;
