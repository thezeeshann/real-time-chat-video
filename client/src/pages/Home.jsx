// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../style/HomePage.css';
import { Video, MessageSquare, Phone, Users, Settings, LogOut } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      {/* Sidebar */}
      <div className="w-20 bg-white bg-opacity-10 flex flex-col items-center justify-between py-8">
        <div className="space-y-8">
          <button className="p-3 rounded-full bg-white text-indigo-600 hover:bg-opacity-90 transition-all">
            <Video size={24} />
          </button>
          <button className="p-3 rounded-full bg-white text-indigo-600 hover:bg-opacity-90 transition-all">
            <MessageSquare size={24} />
          </button>
          <button className="p-3 rounded-full bg-white text-indigo-600 hover:bg-opacity-90 transition-all">
            <Phone size={24} />
          </button>
          <button className="p-3 rounded-full bg-white text-indigo-600 hover:bg-opacity-90 transition-all">
            <Users size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <button className="p-3 rounded-full bg-white text-indigo-600 hover:bg-opacity-90 transition-all">
            <Settings size={24} />
          </button>
          <button className="p-3 rounded-full bg-white text-red-500 hover:bg-opacity-90 transition-all">
            <LogOut size={24} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to ConnectApp</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Start a Video Call</h2>
            <p className="text-white mb-4">Connect face-to-face with your team or loved ones.</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-all">
              New Meeting
            </button>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Send a Message</h2>
            <p className="text-white mb-4">Chat instantly with your contacts.</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-all">
              New Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;