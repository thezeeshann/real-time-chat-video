import { addNewConnectUser } from "../lib/store.js";

const newConnectionHandlere = async (socket, io) => {
  const user = socket.user;
  addNewConnectUser({
    socktId: socket.id,
    userId: user.userId,
  });
};

export default newConnectionHandlere;
