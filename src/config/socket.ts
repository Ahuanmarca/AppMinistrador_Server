import { Server } from 'socket.io';

let io: Server;

function setIo(serverIo: Server) {
  io = serverIo;
}

function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

export {
  setIo,
  getIo,
}
