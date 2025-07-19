import React from "react";
import { Link } from "react-router-dom";
import Container from "../container/Container";
function Footer() {
  return (
    <div className="w-full border text-gray-700 border-gray-500 border-b-0 border-l-0 border-r-0 grid items-center font-semibold text-xs sm:text-base bg-blue-300/30 backdrop-blur-md z-10 shadow">
      <Container>
        <div className="flex justify-between items-center md:h-[10vh] p-4 sm:p-0">
          <ul className="sm:flex sm:gap-4 cursor-pointer ">
            <li className="hover:text-black duration-300">About</li>
            <li className="hover:text-black duration-300">Privacy</li>
            <li className="hover:text-black duration-300">Rules</li>
            <li className="hover:text-black duration-300">Terms</li>
          </ul>
          <ul className="sm:flex sm:gap-4 cursor-pointer">
            <li className="hover:text-black duration-300">Facebook</li>
            <li className="hover:text-black duration-300">Instagram</li>
            <li className="hover:text-black duration-300">Linkedin</li>
            <li className="hover:text-black duration-300">Discord</li>
          </ul>
        </div>
      </Container>
      <div className="text-center border border-gray-500 border-b-0 border-l-0 border-r-0">
        © 2025 Keshav All right reserved.
      </div>
    </div>
  );
}

export default Footer;
