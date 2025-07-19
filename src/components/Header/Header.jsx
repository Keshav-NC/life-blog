import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo, Logout, Container } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="text-xs p-3 sm:text-base md:h-[10vh]  sticky top-3 flex justify-center items-center z-10 ">
      <Container>
        <nav className="flex justify-between items-center bg-blue-300/30 backdrop-blur-md shadow border border-gray-500 rounded-md py-2 px-3">
          <div>
            <Link to={authStatus ? "/" : "/login"}>
              <Logo />
            </Link>
          </div>
          <ul className="flex justify-between items-center gap-1 sm:gap-5">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  {/* <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button> */}
                  {/* <Button
                    children={item.name}
                    
                    onClick={() => navigate(item.slug)}
                  /> */}
                  <NavLink
                    className={({ isActive }) =>
                      `${!isActive ? "text-gray-700" : "text-black"}
                    font-medium duration-300 hover:text-gray-700 ml-2
                      `
                    }
                    to={item.slug}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="flex justify-between items-center gap-1 sm:gap-5">
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
