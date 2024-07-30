import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config();
import cors from "cors";

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
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
});

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  console.log(
    `Listening on port ${port}. Visit http://localhost:${port} in your browser.`
  );
});
