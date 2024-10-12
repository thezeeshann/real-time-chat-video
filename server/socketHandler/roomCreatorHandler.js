import { addNewActiveRooms } from "../lib/store.js";
import { updateRooms } from "./updates/room.js";

export const createNewRoomHandler = (socket) => {
  console.log(socket, "sooooooocket");
  console.log("handle room create event");
  const socketId = socket.id;
  const userId = socket.user.userId;

  const roomDetails = addNewActiveRooms(userId, socketId);

  socket.emit("room-create", {
    roomDetails,
  });

  updateRooms();
};
