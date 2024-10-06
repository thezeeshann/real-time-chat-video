import axios from "axios";
import { useState } from "react";
import { FRIEND_INVITATION_API } from "../redux/api";
import { GoDotFill } from "react-icons/go";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  handleAcceptInvitations,
  handleRejectInvitations,
} from "../utils/friendInvitation";
import { setChosenChatDetails } from "../redux/features/chatSlice";
import { useDispatch } from "react-redux";
import { chatTypes } from "../redux/features/chatSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { pendingFriends } = useSelector((state) => state.friend);
  const { onlineUsers } = useSelector((state) => state.friend);
  const { chosenChatDetails } = useSelector((state) => state.chat);
  const { friends } = useSelector((state) => state.friend);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${FRIEND_INVITATION_API}`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.success === true) {
        toast.success(response.data.message);
        setIsOpen(false);
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.log("FRIEND INVITATION API ERROR", error);
      toast.error(error.response.data.message);
    }
  };
  const handleChooseActiveChat = (dispatch, id, name) => {
    dispatch(
      setChosenChatDetails({
        details: { id: id, name: name },
        chatType: chatTypes.DIRECT,
      })
    );
  };

  return (
    <>
      <div className="relative flex flex-col w-64 min-h-screen text-white bg-gray-800">
        <div className="p-2 text-center bg-green-500 rounded-md">
          <h1
            className="font-semibold cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Add Friend
          </h1>
        </div>
        {/* <p className="mt-2 font-semibold text-center">Private message</p> */}
        <div className="flex-1 p-4">
          {friends.map((friend) => {
            const isOnline = onlineUsers.some(
              (user) => user.socketId.userId === friend.id
            );
            return (
              <div
                key={friend.id}
                className="flex flex-col py-1 cursor-pointer gap-y-1 "
                onClick={() =>
                  handleChooseActiveChat(dispatch, friend?.id, friend?.name)
                }
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-x-2 ">
                    <span
                      className={`${
                        chosenChatDetails?.id === friend?.id
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      } p-2 font-semibold text-white capitalize rounded-full`}
                    >
                      {friend?.name?.slice(0, 2)}
                    </span>
                    <p className="capitalize">{friend?.name}</p>
                  </div>
                  {isOnline ? (
                    <span>
                      <GoDotFill size={20} className="text-green-500" />
                    </span>
                  ) : (
                    <span>
                      <GoDotFill size={20} className="text-gray-500" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col p-4 gap-y-2">
          <p className="w-full text-blue-500">INVITATIONS</p>
          {pendingFriends.map((friend) => (
            <div key={friend._id} className="flex flex-col gap-y-2">
              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-x-2">
                  <span className="p-2 capitalize bg-blue-500 rounded-full">
                    {friend?.senderId?.name.slice(0, 2)}
                  </span>
                  <p className="capitalize">{friend?.senderId?.name}</p>
                </div>
                <span
                  onClick={() => handleRejectInvitations(friend._id, token)}
                  className="cursor-pointer"
                >
                  X
                </span>
                <span
                  onClick={() => handleAcceptInvitations(friend._id, token)}
                  className="cursor-pointer"
                >
                  ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen === true && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleSubmit}>
            <div className="p-4 bg-white w-[500px] h-[180px] rounded">
              <p className="font-semibold text-neutral-500">Invite a Friend</p>
              <p className="font-semibold text-neutral-500">
                Enter a email address of friend which you would like to add
              </p>
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="email"
                  className="font-semibold text-neutral-500"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="border-[1px] py-1 p-2"
                  placeholder="Email Address"
                />
              </div>
              <div className="flex flex-row items-center justify-between mt-2 gap-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-white bg-neutral-500 py-2 rounded-md w-[50%] font-semibold"
                >
                  Colse
                </button>
                <button
                  className="text-white bg-blue-500 rounded-md w-[50%] cursor-pointer py-2 font-semibold"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Sidebar;
