import React from "react";

// Internal Imports
import ProductCard from "./ProductCard";

import { useAppDispatch, useAppSelector } from "../features/hooks";
import { REQUEST_STATUS } from "../constants/enums";
import {
  getAllUploadedProductFiles,
  selectUploadData,
  selectUploadStatus
} from "../features/fileSlice";



function RecomendedSection() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectUploadData);
  const uploadStatus: any = useAppSelector(selectUploadStatus);

    if (uploadStatus == REQUEST_STATUS.IDLE) {
      dispatch(getAllUploadedProductFiles());
    }

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-base p-6 ">Recomended For You</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 ">
          {uploadStatus == REQUEST_STATUS.SUCCEEDED ? (
            data
              .results
              .map(
                (product: any) => (
                  <ProductCard
                    key={product.id}
                    productid={product.id}
                    title={product.title}
                    thumbnail={product.watermarked_file}
                    useship_price={product.useship_price}
                  />
                )
              )
            ) : <div>Loading ...</div>
          }
        </div>
      </div>
    </>
  );
}

export default RecomendedSection;
