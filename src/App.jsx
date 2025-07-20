import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./features/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Loader } from "./components";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading ? (
        <>
          <Header />
          <main>
            <Outlet />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnHover
              theme="colored"
            />
          </main>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
