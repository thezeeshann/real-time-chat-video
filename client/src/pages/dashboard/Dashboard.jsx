import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { connectWithSocketServer } from "../../communication/socket";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  if (token !== null && user !== null) {
    connectWithSocketServer(token);
  }

  return (
    <div className="flex">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Dashboard;
