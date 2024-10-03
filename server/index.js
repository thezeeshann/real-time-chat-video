import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.js";
import friendRoute from "./routes/friends.js";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initializeSocketServer } from "./socketServer.js"; 

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);

// Set up middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to the database
connectDB();

// Initialize the socket server
initializeSocketServer(server);

// Define your routes
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/friend", friendRoute);

// Start the server
server.listen(port, () => {
  console.log(
    `Listening on port ${port}. Visit http://localhost:${port} in your browser.`
  );
});
