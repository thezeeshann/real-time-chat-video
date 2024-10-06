import { updateChatHistory } from "./updates/chat.js";
import ConversationModel from "../models/conversation.js";

export const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await ConversationModel.findOne({
      participants: {
        $all: [userId, receiverUserId],
        type: "DIRECT",
      },
    });

    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (error) {
    console.log(error);
  }
};
