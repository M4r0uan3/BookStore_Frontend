import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PrivateRoute({ user }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  const { exp } = jwt_decode(token);
  if (exp < new Date().getTime() / 1000) {
    // token has expired
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
