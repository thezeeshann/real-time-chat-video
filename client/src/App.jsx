import SignIn from "./pages/auth/Signin";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/Signup";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
