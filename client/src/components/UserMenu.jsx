import { useState } from "react";
import { userLogout } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(userLogout());
  };

  return (
    <section className="">
      <p
        className="relative capitalize cursor-pointer border-[1px] rounded-full p-2 px-3 font-semibold"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user?.name.slice(0, 1)}
      </p>
      {isOpen === true && (
        <ul className="absolute p-2 bg-white rounded right-4 text-neutral-900">
          <li className="p-1 font-semibold rounded cursor-pointer hover:bg-neutral-500 hover:text-white">
            Dashboard
          </li>
          <li
            className="p-1 font-semibold rounded cursor-pointer hover:bg-neutral-500 hover:text-white"
            onClick={() => handleLogout()}
          >
            Logout
          </li>
        </ul>
      )}
    </section>
  );
};

export default UserMenu;
