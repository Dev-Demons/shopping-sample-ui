import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Spinner} from "@chakra-ui/react";

// Internal Imports
import {useAppDispatch, useAppSelector} from "../features/hooks";
import {uError, updateUser, uStatus} from "../features/userSlice";
import {UserDataForm} from "../models/userModels";

import {REQUEST_STATUS} from "../constants/enums";
import {TOAST_TIMEOUT} from "../constants/config";


function ProfileEditComponent() {

    const dispatch = useAppDispatch();

    const status = useAppSelector(uStatus);
    const error = useAppSelector(uError);

    const {
      register,
      handleSubmit,
      reset,
      formState: {}
    } = useForm<UserDataForm>();

    useEffect(
      () => {
        if (status === REQUEST_STATUS.SUCCEEDED) {
            toast.success(
              "Data was updated successfully",
              {autoClose: TOAST_TIMEOUT}
            );
            reset();
        }
    }, [status]);

    const onSubmit = async ({display_name, gender, phone_number}: UserDataForm) => {
        await dispatch(updateUser({display_name, gender, phone_number}));
    };


    return (
        <div className="flex flex-col p-8 md:px-20 bg-white max-w-xl mx-auto">
            <div>
                <h1 className="text-center mb-6 font-bold text-2xl">Update user</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="display_name"
                            id="display_name"
                            placeholder=" "
                            {...register("display_name")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                             border-b-2 appearance-none border-gray-300 focus:border-blue-600 focus:outline-none
                             focus:ring-0  peer"
                        />
                        <label
                            htmlFor="display_name"
                            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10
                            origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600"
                        >
                            Display Name
                        </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="gender"
                            id="gender"
                            placeholder=" "
                            {...register("gender")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                             border-b-2 appearance-none border-gray-300 focus:border-blue-600 focus:outline-none
                             focus:ring-0  peer"
                        />
                        <label
                            htmlFor="gender"
                            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10
                            origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600"
                        >
                            Gender
                        </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="number"
                            name="phone_number"
                            id="phone_number"
                            placeholder=" "
                            {...register("phone_number")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                             border-b-2 appearance-none border-gray-300 focus:border-blue-600 focus:outline-none
                             focus:ring-0  peer"
                        />
                        <label
                            htmlFor="phone_number"
                            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10
                            origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600"
                        >
                            Phone Number
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

export default ProfileEditComponent;