import React, { useEffect } from "react";
import Link from "next/link";

// Internal Imports
import DelProductCard from './DelProductCard'

import { getCartContent } from '../../features/shoppingSlice';
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { productStatus, CartData, productError } from "../../features/shoppingSlice";
import { REQUEST_STATUS } from "../../constants/enums"

const ViewShoppingComponent = () => {

  const dispatch = useAppDispatch();

  const data = useAppSelector(CartData);
  const CartStatus = useAppSelector(productStatus);
  const CartError = useAppSelector(productError);

  if (CartStatus == REQUEST_STATUS.IDLE)
    dispatch(getCartContent());

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 ">
        {data == null || data.products == null ? (
          <div>Loading ... </div>
        ) : (
          data.products.map((product: any) => {
            return (
              <DelProductCard
                key={product.id}
                productid={product.id}
                title={product.product_title}
                thumbnail={product.watermarked_file}
                useship_price={product.product_useship_price}
                product_title={product.product_title}
              />
            );
          })
        )}
      </div>
      <div className="flex flex-col-2 justify-center items-center">
        <Link href="/addProduct2Cart" passHref>
          <button
            type="button"
            className="flex flex-row justify-center items-center space-x-50  text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            style={{ marginTop: '10px' }}
          >
            Go to Add product to cart
          </button>
        </Link>
        <Link href="/" passHref>
          <button
            type="button"
            className="flex flex-row justify-center items-center space-x-50  text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            style={{ marginTop: '10px', marginLeft: '20px' }}
          >
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ViewShoppingComponent;