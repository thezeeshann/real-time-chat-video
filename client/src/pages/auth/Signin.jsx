import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { SIGNIN_API } from "../../redux/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/features/authSlice";

const SignIn = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
      };
      const response = await axios.post(`${SIGNIN_API}`, data);
      console.log(response.data, "data");
      if (response?.data?.success === true) {
        toast.success(response?.data.message);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
        dispath(setToken(response.data.token));
        dispath(setUser(response.data.existUser));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.existUser));
      } else {
        console.log(response.data)
        toast.error(response?.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log(error, "SIGNUP API ERROR");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-white">Welcome back!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400" htmlFor="emailOrPhone">
              Email *
            </label>
            <input
              className="w-full p-2 text-white bg-gray-700 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-400" htmlFor="password">
              Password *
            </label>
            <input
              className="w-full p-2 text-white bg-gray-700 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <a href="#" className="text-sm text-blue-500">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
        <Link to="/signup">
          <p className="mt-4 text-sm font-semibold text-blue-500 cursor-pointer">
            Need an account? Register
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
