import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import { sendDirectMessage } from "../communication/socket";
import { getDirectChatHistory } from "../communication/socket";

const Chat = () => {
  const { chosenChatDetails } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.chat);
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

  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails?.id,
    });
  }, [chosenChatDetails]);

  return (
    <>
      <div className="flex flex-col flex-1 text-white bg-gray-700 ">
        <div className="flex flex-row items-center justify-between p-4 border-b border-gray-600">
          {chosenChatDetails ? (
            <h2 className="text-lg font-bold capitalize">
              Chat with {chosenChatDetails?.name}
            </h2>
          ) : (
            <div></div>
          )}
          <UserMenu />
        </div>

        {!chosenChatDetails ? (
          <div className="flex justify-center h-screen mt-10">
            <p className="text-xl font-semibold">
              To start chatting - choose the conversation
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col h-full">
              {/* Chat header */}
              <div className="flex items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 font-semibold text-white capitalize bg-blue-500 rounded-full">
                    {chosenChatDetails?.name.slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white capitalize">
                      {chosenChatDetails?.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      This is the beginning of your conversation with{" "}
                      {chosenChatDetails?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto ">
                {messages.map((message) => {
                  return (
                    <div key={message._id} className="flex flex-col">
                      <div className="flex flex-row items-start space-x-2 ">
                        <div className="flex items-center justify-center w-8 h-8 font-semibold text-white capitalize bg-blue-500 rounded-full">
                          {message?.author?.name.slice(0, 1)}
                        </div>
                        <div className="">
                          <div className="text-base text-white capitalize rounded-md">
                            {message.content}
                          </div>
                          <p className="text-xs font-semibold text-gray-400">
                            {new Date(message.created).toLocaleDateString(
                              "en-Us",
                              {
                                day: "2-digit",
                                month: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input field */}
              <div className="p-4 border-t border-gray-600">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPressed}
                  className="w-full p-2 text-white bg-gray-600 rounded-md outline-none"
                  placeholder="Type a message..."
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
