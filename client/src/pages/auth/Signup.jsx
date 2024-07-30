import { Link } from "react-router-dom";
import { SIGNUP_API } from "../../redux/api";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        password,
      };
      const response = await axios.post(`${SIGNUP_API}`, data);
      if (response?.data?.success === true) {
        toast.success(response?.data.message);
        setEmail("")
        setPassword("")
        setName("")
      } else {
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
        <h1 className="mb-6 text-2xl font-bold text-white">
          Create an account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400" htmlFor="displayName">
              {" "}
              Name
            </label>
            <input
              className="w-full p-2 text-white bg-gray-700 rounded"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="displayName"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400" htmlFor="email">
              Email *
            </label>
            <input
              className="w-full p-2 text-white bg-gray-700 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400" htmlFor="password">
              Password *
            </label>
            <input
              className="w-full p-2 text-white bg-gray-700 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </form>
        <Link to="/signin">
          <p className="mt-4 text-sm font-semibold text-blue-500">
            Alredy have an account?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
