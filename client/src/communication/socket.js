import io from "socket.io-client";

let socket = null;

export const connectWithSocketServer = (userToken) => {
  socket = io("http://localhost:8000", {
    auth: {
      token: userToken,
    },
  });
  socket.on("connect", () => {
    console.log("successfully connect with socket.io server");
    console.log(socket.id);
  });
};
