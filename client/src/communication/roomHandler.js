import { openRoom } from "../redux/features/roomSlice";

export const createNewRoom = (dispatch) => {
  dispatch(openRoom({ isUserInRoom: true, isUserRoomCreator: true }));
};
