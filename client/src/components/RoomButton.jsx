import { useState } from "react";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { IoMdClose, IoMdMic, IoMdMicOff } from "react-icons/io";
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";

const RoomButton = () => {
  return (
    <div className="w-[100%] gap-x-2 h-[15%] bg-[#5865f2] rounded-md flex items-center justify-center">
      <ScreenShareButton />
      <MicButton />
      <CloseRoomButton />
      <CameraButton />
    </div>
  );
};

export default RoomButton;

export const ScreenShareButton = () => {
  const [shareScreenEnabled, setShareScreenEnabled] = useState(true);
  const handleToggleShareScreed = () => {
    setShareScreenEnabled(!shareScreenEnabled);
  };

  return (
    <div className="cursor-pointer" onClick={handleToggleShareScreed}>
      {shareScreenEnabled ? (
        <MdOutlineScreenShare color="#ffffff" size={22} />
      ) : (
        <MdOutlineStopScreenShare size={22} color="#ffffff" />
      )}
    </div>
  );
};

export const MicButton = () => {
  const [micEnabled, setMicEnabled] = useState(true);
  const handleToggleMic = () => {
    setMicEnabled(!micEnabled);
  };

  return (
    <div className="cursor-pointer" onClick={handleToggleMic}>
      {micEnabled ? (
        <IoMdMic color="#ffffff" size={22} />
      ) : (
        <IoMdMicOff size={22} color="#ffffff" />
      )}
    </div>
  );
};

export const CloseRoomButton = () => {
  const handleCloseRoom = () => {};
  return (
    <div onClick={handleCloseRoom}>
      <IoMdClose size={22} color="#ffffff" />
    </div>
  );
};

export const CameraButton = () => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const handleToggleCamra = () => {
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <div className="cursor-pointer" onClick={handleToggleCamra}>
      {cameraEnabled ? (
        <IoVideocam color="#ffffff" size={22} />
      ) : (
        <IoVideocamOff size={22} color="#ffffff" />
      )}
    </div>
  );
};
