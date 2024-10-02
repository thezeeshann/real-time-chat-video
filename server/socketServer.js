// socketServer.js
import { Server } from "socket.io";
import newConnectionHandlere from "./socketHandler/newConnectionHandler.js";
import disconnectHandler from "./socketHandler/disconnectedHandler.js";
import verifyTokenSocket from "./lib/middleware/authSocket.js";
import { getOnlineUser, setSocketServerInstance } from "./lib/store.js";

// Function to initialize and set up the socket server
export const initializeSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  setSocketServerInstance(io);

  // Middleware to verify token
  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  // Emit the online users to all clients
  const emitOnlineUser = () => {
    const onlineUsers = getOnlineUser();
    io.emit("online-users", { onlineUsers });
  };

  // Handle connection and disconnection events
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    newConnectionHandlere(socket, io);
    emitOnlineUser();

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  // Periodically emit the online users every 8 seconds
  setInterval(() => {
    emitOnlineUser();
  }, 1000 * 8);

  return io;
};
