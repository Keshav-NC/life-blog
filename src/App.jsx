import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./features/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Loader, Landing } from "./components";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.user);
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
            {/* <Landing /> */}
            <Outlet />
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
