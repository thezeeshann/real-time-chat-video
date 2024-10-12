import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { connectWithSocketServer } from "../../communication/socket";
import { useSelector, useDispatch } from "react-redux";
import Room from "../../components/room";

const Dashboard = () => {
  const { chosenChatDetails } = useSelector((state) => state.chat);
  const { isUserInRoom } = useSelector((state) => state.room);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friend);
  const dispatch = useDispatch();

  if (token !== null && user !== null) {
    connectWithSocketServer(token, dispatch, chosenChatDetails, user, friends);
  }

  return (
    <div className="flex">
      <Sidebar />
      <Chat />
      {isUserInRoom && <Room isUserInRoom={isUserInRoom} />}
    </div>
  );
};

export default Dashboard;
