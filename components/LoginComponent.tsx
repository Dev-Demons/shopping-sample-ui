import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { AiFillGoogleSquare } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { Spinner } from "@chakra-ui/react";

// Internal Imports
import { LoginCredentials } from "../models/userModels";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { loginUser, uStatus, uError, uEmail } from "../features/userSlice";
import { UserContext } from "../users/providers";
import { REQUEST_STATUS } from '../constants/enums';



toast.configure();



function LoginComponent() {

  const dispatch = useAppDispatch();

  const status = useAppSelector(uStatus);
  const error = useAppSelector(uError);
  const email = useAppSelector(uEmail);


  const [user, setUser] = React.useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  if (status === REQUEST_STATUS.SUCCEEDED){
    window.location.replace('/');
  }


  const onSubmit = async ({ email, password }: LoginCredentials) => {
    let data: any = await dispatch(loginUser({ email, password }));
    if (data != undefined && data.payload != undefined && data.payload.email != undefined && data.payload.type != undefined)
      setUser({ email: data.payload.email, role: data.payload.type });
  };

  return (
    <div className="grind content-center flex flex-col p-8 md:px-20 bg-white h-106 max-w-xl mx-auto">
      <div>
        <h1 className="text-center mb-6 font-bold text-2xl">Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="email"
              id="floating_email"
              placeholder=" "
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              className={
                "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                (errors.email
                  ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                  : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
              }
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
            <label
              htmlFor="floating_email"
              className={
                "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                (errors.email
                  ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                  : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
              }
            >
              Email Address
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="password"
              id="floating_password"
              placeholder=" "
              {...register("password", { required: true })}
              className={
                "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                (errors.password
                  ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                  : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
              }
            />
            {errors.password && (
              <p className="text-red-600 text-sm">Password is required.</p>
            )}
            <label
              htmlFor="floating_password"
              className={
                "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                (errors.password
                  ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                  : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
              }
            >
              Password
            </label>
          </div>
          {status === REQUEST_STATUS.FAILED && (
            <p className="text-center text-red-600 text-sm mb-4">
              {error !== " " ? error : "Something went wrong"}
            </p>
          )}

          <button
            disabled={status === REQUEST_STATUS.LOADING}
            type="submit"
            className={
              " flex flex-row justify-center items-center space-x-4  text-white bg-blue-700 font-medium rounded-full text-sm w-full  px-5 py-2.5 text-center " +
              (status === REQUEST_STATUS.LOADING
                ? "cursor-not-allowed opacity-75"
                : " hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300")
            }
          >
            {status === REQUEST_STATUS.LOADING && <Spinner className="justify-left" />}
            <p className="text-center">Login</p>
          </button>

          <div className="flex flex-col">
            <h1 className="text-center text-md font-bold text-blue-700 p-2 cursor-pointer">
              Forgot password
            </h1>
            <h2 className="text-center ">
              {" Don't have an account? "}
              <span className=" text-blue-700 font-bold cursor-pointer">
                <Link href="/register">
                  <a>Sign up</a>
                </Link>
              </span>
            </h2>
          </div>
          <div className="flex flex-row items-center justify-center p-4">
            <span className="border-0 border-b-2 border-gray-300 w-1/3"></span>
            <span className="px-2">
              <p className="text-sm text-center "> Or continue with </p>
            </span>
            <span className="border-0 border-b-2 border-gray-300 w-1/3"></span>
          </div>
          <div className="flex flex-row gap-between justify-center items center">
            <div className="cursor-pointer">
              <AiFillGoogleSquare color="gray" size={60} />
            </div>
            <div className="cursor-pointer">
              <AiFillFacebook
                color="gray"
                size={60}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
