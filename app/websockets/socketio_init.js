const { Server } = require("socket.io");
const { connection } = require("./connection");

module.exports = (server) => {
  const io = new Server(server);

  io.on('connection', connection);
  //other io handlers here

  return io;
};