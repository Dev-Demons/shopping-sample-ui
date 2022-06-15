import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@chakra-ui/react";

// Internal Imports
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { uploadProcess, uploadStatus, uploadError } from "../features/fileSlice";
import { UploadFile } from '../models/fileUploadModels';
import { REQUEST_STATUS } from '../constants/enums';
import { TOAST_TIMEOUT } from '../constants/config';

toast.configure();



function FileUploadComponent() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(uploadStatus);
  const error = useAppSelector(uploadError);
  const [msg, setMsg] = React.useState<string>("");
  var fileType: string = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFile>();

  useEffect(() => {
    if (status === REQUEST_STATUS.SUCCEEDED) {
      toast.success("Upload Was Successful", { autoClose: TOAST_TIMEOUT });
    }
  }, [status]);

  const onSubmit = async ({
    file,
    title,
    useship_price,
    resellship_price,
    ownership_price,
  }: UploadFile) => {
    console.log(file);
    const type = file[0].type.includes("image")
      ? "image"
      : file[0].type.includes("video")
      ? "video"
      : "unknown";
    console.log(type);

    fileType = type;
    setMsg("");
    if (fileType !== "") {
      if (fileType !== "unknown") {
        dispatch(
          uploadProcess({
            file,
            title,
            useship_price,
            resellship_price,
            ownership_price,
            fileType,
          })
        );
      } else {
        setMsg("The file format that you have selected is not acceptable");
      }
    }
  };

  return (
    <>
      <div className="grind content-center flex flex-col p-8 md:px-20 bg-white h-106 max-w-xl mx-auto">
        <div>
          <h1 className="text-center mb-6 font-bold text-2xl">
            Upload file(s)
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 mb-6 w-full group">
              <input
                accept="video/*, image/*"
                type="file"
                name="file"
                className={
                  "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid  rounded transition ease-in-out m-0 " +
                  (errors.file
                    ? "border-red-600 focus:text-red-600 focus:bg-red-400 focus:border-red-600 focus:outline-none"
                    : "border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none")
                }
                id="formFileMultiple"
                multiple
                {...register("file", {
                  required: {
                    value: true,
                    message: "File is required",
                  },
                })}
              />

              {errors.file && (
                <p className="text-red-600 text-sm">{errors.file.message}</p>
              )}
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="title"
                id="floating_title"
                placeholder=" "
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
                className={
                  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                  (errors.title
                    ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                    : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
                }
              />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title.message}</p>
              )}
              <label
                htmlFor="floating_title"
                className={
                  "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                  (errors.title
                    ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                    : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
                }
              >
                Title
              </label>
            </div>

            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="useship_price"
                id="floating_useship_price"
                placeholder=" "
                {...register("useship_price", {
                  required: {
                    value: true,
                    message: "Useship price is required",
                  },
                })}
                className={
                  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                  (errors.useship_price
                    ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                    : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
                }
              />
              {errors.useship_price && (
                <p className="text-red-600 text-sm">
                  {errors.useship_price.message}
                </p>
              )}
              <label
                htmlFor="floating_useship_price"
                className={
                  "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                  (errors.useship_price
                    ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                    : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
                }
              >
                Useship price
              </label>
            </div>

            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="resellship_price"
                id="floating_resellship_price"
                placeholder=" "
                {...register("resellship_price", {
                  required: {
                    value: true,
                    message: "Resellship price is required",
                  },
                })}
                className={
                  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                  (errors.resellship_price
                    ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                    : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
                }
              />
              {errors.resellship_price && (
                <p className="text-red-600 text-sm">
                  {errors.resellship_price.message}
                </p>
              )}
              <label
                htmlFor="floating_resellship_price"
                className={
                  "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                  (errors.resellship_price
                    ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                    : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
                }
              >
                Resellship price
              </label>
            </div>

            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="ownership_price"
                id="floating_ownership_price"
                placeholder=" "
                {...register("ownership_price", {
                  required: {
                    value: true,
                    message: "Ownership price is required",
                  },
                })}
                className={
                  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  " +
                  (errors.ownership_price
                    ? " appearance-none focus:border-red-600 border-red-600 focus:outline-none focus:ring-0  peer"
                    : " appearance-none border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0  peer")
                }
              />
              {errors.ownership_price && (
                <p className="text-red-600 text-sm">
                  {errors.ownership_price.message}
                </p>
              )}
              <label
                htmlFor="floating_ownership_price"
                className={
                  "absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10" +
                  (errors.ownership_price
                    ? " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:tex-red-600 text-red-600"
                    : " origin-[0]   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0 peer-focus:text-blue-600 text-gray-500")
                }
              >
                Ownership price
              </label>
            </div>
            {status === "failed" ? (
              <p className="text-center text-red-600 text-sm mb-4">
                {error !== " " ? error : "something went wrong"}
              </p>
            ) : (
              <p className="text-center text-red-600 text-sm mb-4">
                {msg !== " " ? msg : "something went wrong"}
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
              <p className="text-center">Upload</p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FileUploadComponent;
