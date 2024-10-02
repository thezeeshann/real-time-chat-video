import { getActiveUsers, getSocketServerInstance } from "../../lib/store.js";
import FriendModel from "../../models/friend.js";
import UserModel from "../../models/user.js";

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

export const updateFriends = async (userId) => {
  try {
    const receiverList = getActiveUsers(userId);
    if (receiverList.length > 0) {
      const user = await UserModel.findById(userId, {
        _id: 1,
        friends: 1,
      }).populate("friends", "_id name email");

      if (user) {
        const friendList = user.friends.map((f) => {
          return {
            id: f._id,
            name: f.name,
            email: f.email,
          };
        });

        const io = getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendList ? friendList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error)
  }
};

export default friendsPendingInvitations;
