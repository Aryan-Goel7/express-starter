import { Server as SocketIOServer } from 'socket.io';

const socketRouter = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log('Client Connected');

    socket.on('disconnect', () => {
      console.log('Client Disconnected');
    });

    // You can add more event listeners here
  });
};

export default socketRouter;

