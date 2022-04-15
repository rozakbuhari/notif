import { FastifyInstance } from 'fastify';

async function broadcast(fastify: FastifyInstance) {
  const {
    redis: { subscriber },
  } = fastify;

  await subscriber.subscribe('notifications');
  subscriber.on('message', (channel: string, message: string) => {
    console.log(`Received ${message} from ${channel}`);
  });

  console.log(subscriber.subscribe);
}

export default broadcast;
