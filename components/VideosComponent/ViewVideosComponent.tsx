import React, { useEffect } from "react";
import Link from "next/link";

// Internal Imports
import ViewVideosCard from "./viewVideosCard";

import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { REQUEST_STATUS } from "../../constants/enums"

import {
  getVideos,
  uploadStatus,
  uploadError,
  uploadData,
} from "../../features/fileSlice";

function ViewUploadedProducts() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(uploadStatus);
  const error = useAppSelector(uploadError);
  const data = useAppSelector(uploadData);

  if (status == REQUEST_STATUS.IDLE) 
    dispatch(getVideos());

  return (
    <div>
      <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg">
        {status === REQUEST_STATUS.GETVIDEOS && data.count>0? (
          data.results.map((video: any, index: any) => (
            <div className="w-full rounded" key={index}>
              <ViewVideosCard 
                key={video.id}
                videoid={video.id}
                title={video.title}
                thumbnail={video.watermarked_file}
                useship_price={video.useship_price}
              />
            </div>
          ))
        ) : (
          <div className="w-full rounded grid-cols-2">
            No data.
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          <Link href="/" passHref>
            <button
            type="button"
            className="flex flex-row justify-center items-center space-x-50  text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            style={{marginTop: '10px', marginLeft:'20px'}}
            >
            Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewUploadedProducts;
