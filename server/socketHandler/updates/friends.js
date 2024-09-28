import { getActiveUsers, getSocketServerInstance } from "../../lib/store.js";
import FriendModel from "../../models/friend.js";

const friendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendModel.find({
      receiverId: userId,
    }).populate("senderId", " _id name email");

    // find all active user
    const receiverList = getActiveUsers(userId);
    const io = getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friend-invitation", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default friendsPendingInvitations;
