import { addNewConnectUser } from "../lib/store.js";
import friendsPendingInvitations from "./updates/friends.js";
import { updateFriends } from "./updates/friends.js";

const newConnectionHandlere = async (socket, io) => {
  const user = socket.user;
  addNewConnectUser({
    socktId: socket.id,
    userId: user.userId,
  });

  // update pending friends invitation list
  friendsPendingInvitations(user.userId);

  // update friend list
  updateFriends(user.userId);
};

export default newConnectionHandlere;
