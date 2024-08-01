import { useState } from "react";
import { userLogout } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";

const UserMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(userLogout());
  };

  return (
    <section className="">
      <p className="relative cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>Z</p>
      {isOpen === true && (
        <ul className="absolute p-2 bg-white rounded right-4 text-neutral-900">
          <li className="p-1 font-semibold rounded cursor-pointer hover:bg-neutral-500 hover:text-white">Dashboard</li>
          <li className="p-1 font-semibold rounded cursor-pointer hover:bg-neutral-500 hover:text-white" onClick={() => handleLogout()}>Logout</li>
        </ul>
      )}
    </section>
  );
};

export default UserMenu;
