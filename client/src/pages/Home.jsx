import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-5">Welcome to Video Chat</h1>
      <p className="mb-10 text-lg">
        Connect with your friends and family in real time via video and chat.
      </p>
      <div className="flex space-x-5">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg">
          Join a Chat Room
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg">
          Create a New Room
        </button>
      </div>
      <div className="mt-10">
        <img
          src="https://via.placeholder.com/400"
          alt="Video Chat Illustration"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Home;
