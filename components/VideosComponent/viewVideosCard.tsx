import React from "react";

// Internal Imports
import { GetUploadVideo } from '../../models/fileUploadModels';

function ViewVideosCard({ videoid, title, thumbnail, useship_price }: GetUploadVideo) {
  return (
    <div className="h-50 flex flex-col-2 cursor-pointer drop-shadow-lg" style={{paddingTop: '15px', backgroundColor:'rgb(225,225,225)'}}>
        <div className="flex items-center justify-center bg-gray-200 h-40 imageContainer" style={{width:'15%', paddingLeft:'20px'}}>
            <video
                muted
                loop
                controls
                height={200}
                width={200}
                src={thumbnail}
            >
            </video>
        </div>
        <div className="h-10 rounded-bl-lg" style={{width:'70%', paddingLeft:'20px'}}>
            <h1 className="text-lg text-left p-2">
                {title}
            </h1>
            <h1 className="text-sm text-left p-2">
                Image : {videoid}
            </h1>
            <h1 className="text-sm text-left p-2">
                Display name : {title}
            </h1>
        </div>
  </div>
  );
}

export default ViewVideosCard;
