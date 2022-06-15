import React, { useEffect } from "react";
import { Icon, Spinner } from "@chakra-ui/react";
import { FaCalendar, FaEnvelope, FaTransgender } from "react-icons/fa";

// Internal Imports
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { getOwnUser, uData, uStatus } from "../features/userSlice";
import { REQUEST_STATUS } from "../constants/enums";



function ProfileComponent() {

  const dispatch = useAppDispatch();
  // const {data, status} = useAppSelector((state) => state.user);
  const data = useAppSelector(uData);
  const status = useAppSelector(uStatus);

  const { nick_name, email, gender, birthday, rating, number_of_reviewers } = data

  if (status === REQUEST_STATUS.LOADING) {
    return (
      <div className="grid content-center">
        <Spinner />
      </div>
    )
  }

  if (status === REQUEST_STATUS.FAILED) {
    return (
      <div className="grid content-center">
        <h1 className="text-center mb-6 font-bold text-2xl">
          Something went wrong
        </h1>
      </div>
    )
  }

return (
  <div className="mx-auto max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
    {data != null &&
      <div>
        <div className="pt-2 px-2">
          <h2 className="text-gray-800 text-3xl font-semibold">{data.nick_name}</h2>
          <p className="py-2 text-lg text-gray-700">{data.nick_name} has a rating of {data.rating}, out
            of {number_of_reviewers} reviews.</p>
        </div>
        <div className="py-2 px-2">
          <div className="flex items-center mt-2 text-gray-700">
            <Icon h="1.25rem" w="1.25rem" as={FaTransgender} viewBox="0 0 512 512" />
            <h1 className="px-2 text-sm">{data.gender}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <Icon h="1.25rem" w="1.25rem" as={FaCalendar} viewBox="0 0 512 512" />
            <h1 className="px-2 text-sm">{data.birthday}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <Icon h="1.25rem" w="1.25rem" as={FaEnvelope} viewBox="0 0 512 512" />
            <h1 className="px-2 text-sm">{data.email}</h1>
          </div>
        </div>
        <button className="flex flex-row justify-center items-center space-x-4  text-white bg-blue-700
                        font-medium rounded-full text-sm w-full  px-5 py-2.5 text-center hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 mt-6">
          Edit
        </button>
      </div>
    }
  </div>
)
}

export default ProfileComponent;