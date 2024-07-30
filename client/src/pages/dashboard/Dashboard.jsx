import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
    <Sidebar />
    <Chat/>
  </div>
  );
};

export default Dashboard;
