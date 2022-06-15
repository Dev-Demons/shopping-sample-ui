import React from "react";
import {useForm} from "react-hook-form";

// Internal Imports
import { AddProductCart } from '../../models/shoppingModels';
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { addProduct2Cart, removeProductFromCart, productStatus } from "../../features/shoppingSlice";
import { viewAddProductCard } from '../../models/fileUploadModels';
 


function AddProductCard({ productid, title, thumbnail, useship_price }: viewAddProductCard) {

  const dispatch = useAppDispatch();
  const pStatus = useAppSelector(productStatus);

  const {
    handleSubmit,
    reset,
    getValues,
    formState: {errors}
    } = useForm<AddProductCart>();

    const onSubmitAdd = async ({product, type}:AddProductCart) => {
        await dispatch(addProduct2Cart({product:productid, type:"useship"}));
    };
    const onSubmitDel = async ({product, type}:AddProductCart) => {
        await dispatch(removeProductFromCart({product:productid, type:"useship"}));
    };

    return (
      <div className="h-50 flex flex-col-3 cursor-pointer drop-shadow-lg" style={{paddingTop: '15px', backgroundColor:'rgb(225,225,225)'}}>
        <div className="flex items-center justify-center bg-gray-200 h-40 imageContainer" style={{width:'15%', paddingLeft:'20px'}}>
          <img src={thumbnail} alt="product image" />
        </div>
        <div className="h-10 rounded-bl-lg" style={{width:'70%', paddingLeft:'20px'}}>
            <h1 className="text-lg text-left p-2">
                {title}
            </h1>
            <h1 className="text-sm text-left p-2">
                Image : {productid}
            </h1>
            <h1 className="text-sm text-left p-2">
                Display name : {title}
            </h1>
        </div>
        <div style={{width:'15%'}}>
            <form className="flex items-center justify-center" style={{paddingTop:'20px'}} onSubmit={handleSubmit(onSubmitAdd)}>
                <button className="text-center bg-blue-600 px-4 text-sm py-1 text-white hover:bg-blue-500" > Add to Cart </button>
            </form>
            <form className="flex items-center justify-center" style={{paddingTop:'20px'}} onSubmit={handleSubmit(onSubmitDel)}>
                <button className="text-center bg-blue-600 px-4 text-sm py-1 text-white hover:bg-blue-500" > Delete from Cart </button>
            </form>
        </div>
      </div>
  );
}

export default AddProductCard;
