import React, { useEffect } from "react";
import Link from "next/link";

// Internal Imports
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import AddProductCard from './AddProductCard';
import { productStatus, productError } from "../../features/shoppingSlice";
import { REQUEST_STATUS } from "../../constants/enums"
import {
  getAllUploadedProductFiles, 
  selectUploadStatus, 
  selectUploadError, 
  selectUploadData,
} from "../../features/fileSlice";



const AddShoppingComponent = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectUploadData);
    const pStatus = useAppSelector(selectUploadStatus);
    const CartStatus = useAppSelector(productStatus);
    const CartError = useAppSelector(productError);
    
    useEffect(() => {
        if( pStatus == REQUEST_STATUS.IDLE)
            dispatch(getAllUploadedProductFiles());
    }, [pStatus]);
    
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 ">
            {data == null ? (
                <div>Loading ... </div>
                ) : (
                data.results.map((product: any) => {
                    return (
                    <AddProductCard
                        key={product.id}
                        productid={product.id}
                        title={product.title}
                        thumbnail={product.watermarked_file}
                        useship_price={product.useship_price}
                    />
                    );
                })
                )}
            </div>
            <div className="flex flex-col-2 justify-center items-center">
                <Link href="/viewShopping" passHref>
                    <button
                    type="button"
                    className="flex flex-row justify-center items-center space-x-50  text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                    style={{marginTop: '10px'}}
                    >
                    Go to View products in the cart
                    </button>
              </Link>
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
    );
}

export default AddShoppingComponent;