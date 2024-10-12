import {
  openRoom,
  setActiveRooms,
  setRoomDetails,
} from "../redux/features/roomSlice";
import { createNewRooms } from "./socket";

export const createNewRoom = (dispatch) => {
  dispatch(openRoom({ isUserInRoom: true, isUserRoomCreator: true }));
  createNewRooms();
};

export const newRoomCreated = (data, dispatch) => {
  const { roomDetails } = data;
  dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data, dispatch, friends) => {
  const { activeRooms } = data;

  const rooms = [];
  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.name });
      }
    });
  });

  dispatch(setActiveRooms(rooms));
};
