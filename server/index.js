import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.js";
import friendRoute from "./routes/friends.js";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyTokenSocket from "./lib/middleware/authSocket.js";
import newConnectionHandlere from "./socketHandler/newConnectionHandler.js";
import disconnectHandler from "./socketHandler/disconnectedHandler.js";
import { setSocketServerInstance } from "./lib/store.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
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

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
connectDB();

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  newConnectionHandlere(socket, io);

  socket.on("disconnect", () => {
    disconnectHandler(socket);
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/friend", friendRoute);

server.listen(port, () => {
  console.log(
    `Listening on port ${port}. Visit http://localhost:${port} in your browser.`
  );
});
