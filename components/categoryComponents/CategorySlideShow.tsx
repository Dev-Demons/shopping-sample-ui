import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const slideImages = [
  {
    url: "/assets/DataMall.jpg",
    caption: "Slide 1",
  },
  {
    url: "/assets/DataMall2.jpg",
    caption: "Slide 2",
  },
  {
    url: "/assets/DataMall3.jpg",
    caption: "Slide 3",
  },
  {
    url: "/assets/DataMall4.jpg",
    caption: "Slide 4",
  },
];
function CategorySlideShow() {
  return (
    <div className="slide-container p-2">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div className="image-container">
              <img src={slideImage.url} alt="slide image" />
            </div>
            {/* <h2>{fadeImage.caption}</h2> */}
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default CategorySlideShow;
