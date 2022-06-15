import React from "react";
import Link from "next/link";
import { GlobalLink } from '../../models/userModels';

function CategorySectionButton({ title, link, type="button" }: GlobalLink) {
  return (
    <div className="p-2">
      <Link href={link} passHref>
        <button
          type={type}
          className="bg-blue-600 text-white text-center text-sm w-24 h-6 hover:bg-blue-500"
        >
          {title}
        </button>
      </Link>
    </div>
  );
}

export default CategorySectionButton;
