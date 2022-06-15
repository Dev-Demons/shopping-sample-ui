import React from "react";

function LoadMoreButton({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <button
        type="button"
        className="bg-blue-600 text-white rounded-full w-80 h-10 hover:bg-blue-500"
      >
        {title}
      </button>
    </div>
  );
}

export default LoadMoreButton;
