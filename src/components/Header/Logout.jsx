import React from "react";
import { logout } from "../../features/slice/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <button
      className="p-2 duration-300 border border-red-700 hover:bg-red-700 text-red-700 font-semibold rounded-xl hover:text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
