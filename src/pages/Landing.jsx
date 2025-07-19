import React from "react";
import { Button, Container } from "../components";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="h-[73vh] sm:h-[76vh] p-3 sm:p-0 flex justify-start items-center text-gray-800 overflow-hidden">
        <div>
          <h1 className="text-4xl sm:text-8xl font-bold sm:leading-20 mb-2">
            Human stories <br /> & ideas
          </h1>
          <h2 className="text-2xl mb-2">
            A place to read, write, and deepen your understanding
          </h2>
          <Button
            children={"Get Started"}
            width="w-30"
            bgColor="bg-transparent hover:bg-gray-800 "
            textColor="text-black hover:text-white"
            className="border border-gray-800 font-semibold"
            onClick={() => {
              navigate("/login");
            }}
          />
        </div>
        <div className="fixed overflow-hidden left-0 -z-10">
          <img
            className="opacity-40 rounded-md"
            src="/landing.jpg"
            alt="landing-image"
          />
        </div>
      </div>
    </Container>
  );
}

export default Landing;
