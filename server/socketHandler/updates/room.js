import { getActiveRooms, getSocketServerInstance } from "../../lib/store.js";

export const updateRooms = (toSpecifiedTargetId = null) => {
  const io = getSocketServerInstance();
  const avtiveRooms = getActiveRooms();

  if (toSpecifiedTargetId) {
    io.to(toSpecifiedTargetId).emit("active-rooms", {
      avtiveRooms,
    });
  } else {
    io.emit("active-rooms", {
      avtiveRooms,
    });
  }
};
