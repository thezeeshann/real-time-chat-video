import jwt from "jsonwebtoken";

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake?.auth?.token;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decode;
  } catch (error) {
    console.log(error);
  }
  next();
};

export default verifyTokenSocket;
