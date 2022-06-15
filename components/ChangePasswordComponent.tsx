import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Spinner} from "@chakra-ui/react";

// Internal Imports
import {useAppDispatch, useAppSelector} from "../features/hooks";
import {changePassword, uError, uStatus} from "../features/userSlice";
import { ChangePassword } from '../models/userModels';
import { REQUEST_STATUS } from '../constants/enums';
import { TOAST_TIMEOUT } from '../constants/config';


toast.configure();



function ChangePasswordComponent() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(uStatus);
  const error = useAppSelector(uError);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {errors}
  } = useForm<ChangePassword>();

  useEffect(() => {
    if (status === REQUEST_STATUS.SUCCEEDED) {
      toast.success("Password sas changed successfully", {autoClose: TOAST_TIMEOUT});
      reset();
    }
  }, [status]);

  const onSubmit = async ({current_password, new_password}: ChangePassword) => {
    await dispatch(changePassword({current_password, new_password}));
  };

  return (
    <div className="grind content-center flex flex-col p-8 md:px-20 bg-white max-w-xl mx-auto">
      <div>
        <h1 className="text-center mb-6 font-bold text-2xl">Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="current_password"
              id="current_password"
              placeholder=" "
              {...register("current_password", {
                required: {
                  value: true,
                  message: "Current password is required",
                }
              })}
              className={
                "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                (errors.current_password
                  ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                  : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
              }
            />
            {errors.current_password && (
              <p className="text-red-600 text-sm">{errors.current_password.message}</p>
            )}
            <label
              htmlFor="current_password"
              className={
                "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                (errors.current_password
                  ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                  : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
              }
            >
              Current Password
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="new_password"
              id="new_password"
              placeholder=" "
              {...register("new_password", {
                required: {
                  value: true,
                  message: "New password is required",
                },
              })}
              className={
                "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                (errors.new_password
                  ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                  : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
              }
            />
            {errors.new_password && (
              <p className="text-red-600 text-sm">{errors.new_password.message}</p>
            )}
            <label
              htmlFor="new_password"
              className={
                "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                (errors.new_password
                  ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                  : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
              }
            >
              New Password
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="new_password_again"
              id="new_password_again"
              placeholder=" "
              {...register("new_password_again", {
                required: true,
                validate: (value: string) => {
                  const {new_password} = getValues()
                  if (new_password !== value) {
                    return new_password === value || "Passwords should match!";
                  }
                }
              })}
              className={
                "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                (errors.new_password_again
                  ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                  : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
              }
            />
            {errors.new_password_again && (
              <p className="text-red-600 text-sm">{errors.new_password_again.message}</p>
            )}
            <label
              htmlFor="new_password"
              className={
                "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                (errors.new_password_again
                  ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                  : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
              }
            >
              Enter New Password Again
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
            {status === REQUEST_STATUS.LOADING && <Spinner className="justify-left"/>}
            <p className="text-center">Submit</p>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordComponent;