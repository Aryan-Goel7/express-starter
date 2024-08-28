import config from './config/config';
import logger from './util/logger';
import app from './app';

const server = app.listen(config.PORT);

(() => {
  try {
    logger.info('APPLICATION STARTED', {
      meta: {
        PORT: config.PORT,
        SERVER_URL: config.SERVER_URL,
      },
    });
  } catch (error) {
    logger.error('APPLICATION ERROR', {
      meta: {
        error,
      },
    });

    server.close((err) => {
      if (err) {
        logger.error('APPLICATION ERROR ', {
          meta: {
            err,
          },
        });
      }
      process.exit(1);
    });
  }
})();

