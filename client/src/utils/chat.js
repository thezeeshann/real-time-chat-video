import { setMessage } from "../redux/features/chatSlice";

const updateChatHistoryIfSameConversationActive = (
  participants,
  userInConversation,
  messages,
  dispatch
) => {
  const results = participants.every((participantId) => {
    return userInConversation.includes(participantId);
  });

  if (results) {
    dispatch(setMessage(messages));
  }
};

export const updateDirectChatHistoryIfActive = (
  data,
  dispatch,
  chosenChatDetails,
  user
) => {

  console.log(chosenChatDetails,"CCCCC")
  const { participants, messages } = data;
  const userId = user?._id;
  const receiverId = chosenChatDetails?.id;

  if (userId && receiverId) {
    const userInConversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive(
      participants,
      userInConversation,
      messages,
      dispatch
    );
  }
};
