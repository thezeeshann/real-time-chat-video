import io from "socket.io-client";
import {
  pendingFriendsInvitations,
  setFriends,
  onlineFriends,
} from "../redux/features/friendSlice";
import { updateDirectChatHistoryIfActive } from "../utils/chat";
import { newRoomCreated, updateActiveRooms } from "./roomHandler";

let socket = null;

export const connectWithSocketServer = (
  userToken,
  dispatch,
  chosenChatDetails,
  user,
  friends
) => {
  socket = io("http://localhost:8000", {
    auth: {
      token: userToken,
    },
  });
  socket.on("connect", () => {
    console.log("successfully connect with socket.io server");
    console.log(socket.id);
  });

  socket.on("friend-invitation", (data) => {
    const { pendingInvitations } = data;
    console.log("friend invitation event received", pendingInvitations);
    dispatch(pendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    // console.log("online users update came", onlineUsers);
    dispatch(onlineFriends(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log(data, "Chat history received");
    updateDirectChatHistoryIfActive(data, dispatch, chosenChatDetails, user);
  });
  socket.on("room-create", (data) => {
    console.log(data, "create room data");
    newRoomCreated(data, dispatch);
  });

  socket.on("active-rooms", (data) => {
    updateActiveRooms(data, dispatch, friends);
  });
};

export const sendDirectMessage = (data) => {
  console.log(data, "data comming to the server");
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  console.log(data, "Fetching chat history for conversation");
  socket.emit("direct-chat-history", data);
};

export const createNewRooms = (data) => {
  socket.emit("room-create", data);
};
