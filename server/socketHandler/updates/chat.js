import ConversationModel from "../../models/conversation.js";
import { getActiveUsers, getSocketServerInstance } from "../../lib/store.js";

export const updateChatHistory = async (
  conversatiomId,
  toSpecifiedSocketId = null
) => {
  const conversation = await ConversationModel.findById(
    conversatiomId
  ).populate({
    path: "messages",
    model: "Model",
    populate: {
      path: "author",
      model: "User",
      select: "name _id",
    },
  });

  if (conversation) {
    const io = getSocketServerInstance();

    if (toSpecifiedSocketId) {
      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }


    // check if the users of converstion are online 
    // if yes emit to them and update messages 

    conversation.participants.forEach((userId) => {
      const activeUsers = getActiveUsers(userId.toString());
      activeUsers.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};
