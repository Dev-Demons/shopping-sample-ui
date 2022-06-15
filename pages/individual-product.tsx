import { useRouter } from "next/router";
import React, { useEffect } from "react";

// Internal Imports
import {
  getIndividualProduct,
  productData as selectProductData,
  productStatus as selectProductStatus,
} from "../features/individualProductSlice";

import { useAppDispatch, useAppSelector } from "../features/hooks";
import { REQUEST_STATUS } from "../constants/enums";



const IndividualProduct = () => {

  const dispatch = useAppDispatch();

  // Get id info from endpoint
  const router = useRouter();
  const { id } = router.query;

  // Get redux state
  const productDetails = useAppSelector(selectProductData);
  const productStatus = useAppSelector(selectProductStatus);

  // Fill store if idle
  if (productStatus == REQUEST_STATUS.idle)
    dispatch(getIndividualProduct(id));

  return (
    <>
      <div>
        {productDetails == null ? (
          <div>Loading ... </div>
        ) : (
          <div>
            <img
              src={productDetails.watermarked_file}
              alt="watermarked_thumbnail"
            />
            <h1>{productDetails.title}</h1>
            <h1>{productDetails.useship_price}</h1>
            <button>Update the product</button>
          </div>
        )}
      </div>
    </>
  );
};

export default IndividualProduct;
