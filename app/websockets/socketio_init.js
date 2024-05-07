const { Server } = require("socket.io");
const appHandler = require("./appHandler");

module.exports = (server) => {
  const io = new Server(server, {
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    },
    connectTimeout: 100000,

  });

  //middleware
  io.use(async (socket, next) => {
    next();
  });

  //default connections
  io.on("connection", (socket) => {
    appHandler(io, socket);
    //register other app hanlders here
  });

  // namespace connections
  io.of("/admin").on("connection", (socket) => {
    // admin namespace
    //register other app hanlders here
  });
  //to connect to namespace
  //const adminSocket = io("https://example.com/admin"); 



  return io;
};