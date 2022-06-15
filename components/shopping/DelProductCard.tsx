import React from "react";
import {useForm} from "react-hook-form";

// Internal Imports
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { removeProductFromCart } from "../../features/shoppingSlice";
import { ViewDelProductCard } from '../../models/fileUploadModels';
import { AddProductCart } from '../../models/shoppingModels';

function DelProductCard({ productid, title, thumbnail, useship_price, product_title }: ViewDelProductCard) {
  
  const {
    handleSubmit,
    reset,
    getValues,
    formState: {errors}
  } = useForm<AddProductCart>();

  const dispatch = useAppDispatch();

  const onSubmitDel = async ({product, type}:AddProductCart) => {
    await dispatch(removeProductFromCart({product:productid, type:"useship"}));
  };

  return (
      <div className="mt-8 h-50 flex flex-col-3 cursor-pointer drop-shadow-lg" style={{paddingTop: '15px'}}>
        <div className="flex items-center justify-center bg-gray-200 h-40 imageContainer" style={{width:'15%'}}>
          <img src={thumbnail} alt="product image" />
        </div>
        <div className="h-10 rounded-bl-lg" style={{width:'70%'}}>
            <h1 className="text-lg text-left p-2">
                {product_title}
            </h1>
            <h1 className="text-sm text-left p-2">
                Image : {productid}
            </h1>
            <h1 className="text-sm text-left p-2">
                Usership Unit Price : {useship_price}
            </h1>
            <h1 className="text-sm text-left p-2">
                Display name : {title}
            </h1>
        </div>
        <div style={{width:'15%'}}>
            <form className="flex items-center justify-center" style={{paddingTop:'20px'}} onSubmit={handleSubmit(onSubmitDel)}>
                <button className="text-center bg-blue-600 px-4 text-sm py-1 text-white hover:bg-blue-500" > Delete from Cart </button>
            </form>
        </div>
      </div>
  );
}

export default DelProductCard;
