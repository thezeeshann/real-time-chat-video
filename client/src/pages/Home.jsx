import React from "react";
import { FaHome, FaEnvelope, FaVideo, FaCog, FaSignOutAlt, FaUsers, FaVideoSlash } from "react-icons/fa";

const Sidebar = () => (
  <div className="h-screen w-16 flex flex-col items-center py-4 bg-gray-900">
    <IconWrapper>
      <FaHome className="text-white hover:text-glow-blue" />
    </IconWrapper>
    <IconWrapper>
      <FaEnvelope className="text-white hover:text-glow-pink" />
    </IconWrapper>
    <IconWrapper>
      <FaVideo className="text-white hover:text-glow-blue" />
    </IconWrapper>
    <IconWrapper>
      <FaCog className="text-white hover:text-glow-pink" />
    </IconWrapper>
    <IconWrapper>
      <FaSignOutAlt className="text-white hover:text-glow-blue" />
    </IconWrapper>
  </div>
);

const IconWrapper = ({ children }) => (
  <div className="my-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out shadow-lg hover:shadow-glow">
    {children}
  </div>
);

const Card = ({ icon: Icon, title, description, buttonText }) => (
  <div className="p-6 bg-gray-800 shadow-2xl rounded-lg hover:shadow-3xl transition duration-300 ease-in-out h-64">
    <div className="flex items-center space-x-4 mb-4">
      <Icon className="text-5xl text-gray-300" />
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </div>
    <p className="text-gray-300 mb-4">{description}</p>
    <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      {buttonText}
    </button>
  </div>
);

const HomePage = () => (
  <div className="flex h-screen bg-black">
    <Sidebar />
    <div className="flex-grow p-6">
      <h1 className="text-4xl text-white mb-8">Welcome to Chat and Video Messaging</h1>
      <p className="text-gray-300 mb-8">Create a new chat group or start a new video call by selecting one of the options below.</p>
      
      {/* Card Section */}
      <div className="flex flex-wrap justify-between space-x-4">
        <div className="w-full lg:w-5/12 mb-6">
          <Card
            icon={FaUsers}
            title="Create New Chat Group"
            description="Start a new group conversation with your friends or colleagues."
            buttonText="Create Group"
          />
        </div>
        <div className="w-full lg:w-5/12 mb-6">
          <Card
            icon={FaVideoSlash}
            title="Start New Video Call"
            description="Initiate a video call and connect with your contacts instantly."
            buttonText="Start Call"
          />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
