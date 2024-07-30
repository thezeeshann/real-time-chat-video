import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  if (token !== null && user !== null) {
    return <Outlet />;
  }else{
    return <Navigate to="/signin" />
  }
};

export default PrivateRoute;
