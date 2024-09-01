import config from './config/config';
import logger from './util/logger';
import app from './app';
import socketRouter from './router/socketRouter';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new SocketIOServer(server);

// Setup Socket.IO routes or logic
socketRouter(io);

server.listen(config.PORT, () => {
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
});

