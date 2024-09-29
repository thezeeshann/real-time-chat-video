import { addNewConnectUser } from "../lib/store.js";
import friendsPendingInvitations from "./updates/friends.js";

const newConnectionHandlere = async (socket, io) => {
  const user = socket.user;
  addNewConnectUser({
    socktId: socket.id,
    userId: user.userId,
  });

  friendsPendingInvitations(user.userId)

};

export default newConnectionHandlere;
