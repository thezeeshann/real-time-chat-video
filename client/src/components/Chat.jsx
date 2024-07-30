const Char = () => {
  return (
    <div className="flex flex-col flex-1 text-white bg-gray-700">
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-xl font-bold">Chat with Khizar</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex">
            <div className="p-4 bg-gray-600 rounded-md">Message 1</div>
          </div>
          <div className="flex">
            <div className="p-4 bg-gray-600 rounded-md">Message 2</div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-600">
        <input
          type="text"
          className="w-full p-2 bg-gray-600 rounded-md"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default Char;
