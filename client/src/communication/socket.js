import io from "socket.io-client";
import { pendingFriendsInvitations } from "../redux/features/friendSlice";

let socket = null;

export const connectWithSocketServer = (userToken, dispatch) => {
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
  
};
