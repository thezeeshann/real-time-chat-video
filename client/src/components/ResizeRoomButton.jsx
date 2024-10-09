import { MdCloseFullscreen, MdFullscreen } from "react-icons/md";

const ResizeRoomButton = ({ isRoomMinized, roomResizeHandler }) => {
  return (
    <div className="absolute bottom-3 right-3">
      {isRoomMinized ? (
        <span className="cursor-pointer" onClick={roomResizeHandler}>
          <MdFullscreen color="#ffffff" size={22} />
        </span>
      ) : (
        <span className="cursor-pointer" onClick={roomResizeHandler}>
          <MdCloseFullscreen color="#ffffff" size={22} />
        </span>
      )}
    </div>
  );
};

export default ResizeRoomButton;
