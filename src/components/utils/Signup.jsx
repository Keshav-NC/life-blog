import React, { useState } from "react";
import { login } from "../../features/slice/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, Container, Logo } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function Signup() {
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (data) => {
    console.log(data);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    console.log(error);
  };
  return (
    <Container>
      <div className="h-[80vh] flex justify-center items-center">
        {error && (
          <p className="text-red-600 text-center font-semibold text-xl">
            {error}
          </p>
        )}
        <form className="md:w-1/3" onSubmit={handleSubmit(handleSignUp)}>
          <span className="flex justify-center items-center font-semibold text-4xl text-gray-900">
            <h1>Join </h1>
            <Logo />
          </span>
          <div className="w-full p-5 shadow-xl my-5 rounded-md bg-white backdrop-blur-3xl">
            <Input
              label={"Name: "}
              placeholder={"Username"}
              {...register("name", {
                required: "Username is required",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-red-500 text-center text-sm font-semibold">
                  {message}
                </p>
              )}
            />
            <Input
              label={"Email: "}
              placeholder="Email"
              type="email"
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
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="text-red-500 text-center text-sm font-semibold">
                  {message}
                </p>
              )}
            />
            <Input
              label={"Password: "}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="text-red-500 text-center text-sm font-semibold">
                  {message}
                </p>
              )}
            />
            <Button type="submit" children={"Create Account"} />
            <div className="flex justify-center items-center gap-1 font-semibold text-gray-700 mt-3">
              <p>Already have an account?</p>
              <Link className="hover:text-gray-900 duration-300" to={"/login"}>
                SignIn
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
