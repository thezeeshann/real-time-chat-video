import { Server } from "socket.io";
import newConnectionHandlere from "./socketHandler/newConnectionHandler.js";
import disconnectHandler from "./socketHandler/disconnectedHandler.js";
import verifyTokenSocket from "./lib/middleware/authSocket.js";
import { getOnlineUser, setSocketServerInstance } from "./lib/store.js";
import { directMessageHandler } from "./socketHandler/directMessageHandler.js";
import { directChatHistoryHandler } from "./socketHandler/directChatHistoryHandler.js";

export const initializeSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  const emitOnlineUser = () => {
    const onlineUsers = getOnlineUser();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    newConnectionHandlere(socket, io);
    emitOnlineUser();

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUser();
  }, 1000 * 8);

  return io;
};
