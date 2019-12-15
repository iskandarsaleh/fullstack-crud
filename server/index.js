const Fastify = require('fastify');
const fastifyMongooseAPI = require('fastify-mongoose-api');
const fastifyFormbody = require('fastify-formbody');

const { dbConnection } = require('./db');
require('./track.schema')(dbConnection);

async function bootstrap() {
  const fastify = Fastify();
  fastify.register(fastifyFormbody);
  fastify.register(fastifyMongooseAPI, {
    models: dbConnection.models,
    prefix: '/',
    setDefaults: true,
    methods: ['list', 'get', 'post', 'patch', 'put', 'delete', 'options'],
  });

  await fastify.ready();
  const PORT = process.env.PORT || 3000;
  await fastify.listen(PORT);

  console.log(`Server listening on 0.0.0.0:${PORT}`);
}

bootstrap();