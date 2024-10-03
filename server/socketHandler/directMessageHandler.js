import MessageModel from "../models/message.js";
import ConversationModel from "../models/conversation.js";
import { updateChatHistory } from "./updates/chat.js";

export const directMessageHandler = async (socket, data) => {
  console.log(socket, "sssss");
  try {
    console.log("direct message being handled");

    const { userId } = socket.user;
    console.log(userId);
    const { receiverUserId, content } = data;

    const message = await MessageModel.create({
      author: userId,
      content: content,
      type: "DIRECT",
    });

    // find if conversatiom exist with two users - if not create new
    const conversation = await ConversationModel.findOne({
      participants: {
        $all: [userId, receiverUserId],
      },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      // perfome and update sender and receiver if it is online
      updateChatHistory(conversation._id.toString());
    } else {
      // create new conversation if not exist
      const newConversation = await ConversationModel.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perfome and update sender and receiver if it is online
      updateChatHistory(conversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};
