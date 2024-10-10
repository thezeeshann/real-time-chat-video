import { useState } from "react";
import ResizeRoomButton from "./ResizeRoomButton";
import VideoContainer from "./VideoContainer";
import RoomButton from "./RoomButton";

const Room = () => {
  const [isRoomMinized, setIsRoomMiniazed] = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMiniazed(!isRoomMinized);
  };

  return (
    <div
      className={`${
        isRoomMinized
          ? "w-[30%] h-[40vh] right-0 bottom-0"
          : "w-[100%] h-[100vh]"
      } absolute rounded-md flex flex-col items-center justify-center bg-[#202225]`}
    >
      <VideoContainer />
      <RoomButton />
      <ResizeRoomButton
        isRoomMinized={isRoomMinized}
        roomResizeHandler={roomResizeHandler}
      />
    </div>
  );
};

export default Room;
