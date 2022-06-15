import React, { useState } from "react";

// Internal Imports
import { viewAddProductCard } from '../models/fileUploadModels';

function ProductCard({ productid, title, thumbnail, useship_price }: viewAddProductCard) {

  const [isHovered, setHover] = useState(false);
  return (
      <div className="mb-8 h-50 flex flex-col cursor-pointer hover:bg-white hover:opacity-50 drop-shadow-lg">
        <div 
          className="flex items-center justify-center bg-gray-200 h-40 imageContainer" 
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img src={thumbnail} alt="product image" />
        </div>
        <div className="bg-white h-10  rounded-bl-lg rounded-br-lg ">
          <h1 className="text-sm text-center p-2">
            Title: {title} | Price: {useship_price}
          </h1>
        </div>
      </div>
  );
}

export default ProductCard;
