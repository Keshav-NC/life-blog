import React, { useState } from "react";
import { login } from "../../features/slice/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Container, Input, Logo } from "../index";
import { ErrorMessage } from "@hookform/error-message";

function Login() {
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <Container>
      <div className="h-[75vh] flex justify-center items-center">
        {error && (
          <p className="text-red-600 text-center font-semibold">
            {error} error
          </p>
        )}
        <form className="md:w-1/3" onSubmit={handleSubmit(handleLogin)}>
          <span className="flex justify-center items-center font-semibold text-4xl text-gray-900">
            <h1>Join </h1>
            <Logo />
          </span>
          <div className="w-full p-5 shadow-xl my-5 rounded-md bg-white backdrop-blur-3xl">
            <Input
              label={"Email: "}
              type="email"
              placeholder={"Email"}
              {...register("email", {
                required: "Email address is required",
                validate: {
                  matchPattern: (v) =>
                    emailPattern.test(v) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => (
                <p className="text-red-500 text-center text-sm font-semibold">
                  {message}
                </p>
              )}
            />

            <Input
              label={"Password: "}
              type="password"
              placeholder={"Password"}
              {...register("password", {
                required: "Password is required",
              })}
            />
            <ErrorMessage
              name="password"
              errors={errors}
              render={({ message }) => (
                <p className="text-red-500 text-center text-sm font-semibold">
                  {message}
                </p>
              )}
            />

            <Button type="submit" children={"Login"} />
            <div className="flex justify-center items-center gap-1 font-semibold text-gray-700 mt-3">
              <p>Don't have an account?</p>
              <Link className="hover:text-gray-900 duration-300" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
