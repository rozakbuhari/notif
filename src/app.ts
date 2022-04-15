import process from 'process';
import fastify from 'fastify';
import fastifyRedis, { FastifyRedisPluginOptions } from 'fastify-redis';
import routes from './routes';
import broadcast from './services/broadcast';

const PORT = process.env.PORT || 3000;
const app = fastify();

app
  .register(fastifyRedis, {
    namespace: 'publisher',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  } as FastifyRedisPluginOptions)
  .register(fastifyRedis, {
    namespace: 'subscriber',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  } as FastifyRedisPluginOptions);
app.register(routes);
app.register(broadcast);

app.listen(PORT, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
