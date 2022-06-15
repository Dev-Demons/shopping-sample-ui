import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import Image from "next/image";
import { REQUEST_STATUS } from "../constants/enums";

import {
  getAllUploadedProductFiles,
  selectUploadStatus,
  selectUploadError,
  selectUploadData,
} from "../features/fileSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function ViewUploadedProducts() {

  const dispatch = useAppDispatch();

  const uploadStatus: REQUEST_STATUS = useAppSelector(selectUploadStatus);
  // const uploadError = useAppSelector(selectUploadError);
  const uploadData = useAppSelector(selectUploadData);

  if (uploadStatus === REQUEST_STATUS.IDLE)
    dispatch(getAllUploadedProductFiles());

  return (
    <>
      <div>
        <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
          {
            uploadStatus === REQUEST_STATUS.SUCCEEDED ? (
              uploadData
                .results
                .map(
                  (product: any, index: any) => (
                    <div className="w-full rounded" key={index}>
                      <Image
                        loader={() => product.watermarked_file}
                        key={product.id}
                        alt={product.title}
                        height={100}
                        src={product.watermarked_file}
                        width={100}
                        layout="responsive"
                        quality={100}
                        priority
                        unoptimized
                      />
                    </div>
                  )
                )
            ) : uploadStatus === REQUEST_STATUS.FAILED ? (
              <div className="w-full rounded">
                <>Failed...</>
              </div>
            ) : (
              <>Loading...</>
            )
          }
        </div>
      </div>
    </>
  );
}

export default ViewUploadedProducts;
