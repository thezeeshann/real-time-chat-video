import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { useState } from "react";
// import { setChosenChatDetails } from "../redux/features/chatSlice";
import { sendDirectMessage } from "../communication/socket";

const Char = () => {
  const { chosenChatDetails } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
    }
  };

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 text-white bg-gray-700 ">
        <div className="flex flex-row items-center justify-between p-4 border-b border-gray-600">
          {chosenChatDetails ? (
            <h2 className="text-lg font-bold">
              Chat with {chosenChatDetails?.name}
            </h2>
          ) : (
            <div></div>
          )}
          <UserMenu />
        </div>

        {!chosenChatDetails ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-xl font-semibold">
              To start chatting - choose the conversation
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col space-y-4">
                <div className="flex">
                  <div className="p-4 bg-gray-600 rounded-md">Message 1</div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-600">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPressed}
                className="w-full p-2 bg-gray-600 rounded-md"
                placeholder="Type a message..."
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Char;
