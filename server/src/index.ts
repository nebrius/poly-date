import { join } from 'path';
import Fastify from 'fastify';
import fastifiStatic from 'fastify-static';

// Require the framework and instantiate it
const fastify = Fastify({
  logger: true
});

fastify.register(fastifiStatic, {
  root: join(__dirname, '..', '..', 'public')
});

// Run the server!
fastify.listen(process.env.PORT || 3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
