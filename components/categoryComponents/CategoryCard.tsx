import React from "react";
import { GlobalIcon } from '../../models/userModels';

function CategoryCard({ Icon1, Title, Icon2 }: GlobalIcon) {
  return (
    <div className="flex flex-row items-center p-1 space-x-1 cursor-pointer hover:text-blue-600 ">
      <span>{Icon1}</span>
      <h2>{Title}</h2>
      <span className="pl-16">{Icon2}</span>
    </div>
  );
}

export default CategoryCard;
