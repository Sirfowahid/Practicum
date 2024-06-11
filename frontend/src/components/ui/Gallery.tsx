import React from "react";
import ImgCard, { Props as ImgProp } from "./ImgCard";
interface Props {
  images: ImgProp[];
}
const Gallery = ({ images }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <ImgCard key={index} src={image.src} caption={image.caption} />
        ))}
      </div>
      <p className="text-lg mt-4 text-center mx-auto max-w-screen-md">
        Discover luxury and comfort in every corner of our hotel. Nestled in the
        heart of the city, our establishment offers modern amenities and
        timeless elegance. Each room provides a haven of relaxation, ensuring a
        memorable stay. Whether for business or leisure, our dedicated team is
        here to make your experience truly unforgettable.
      </p>
    </>
  );
};

export default Gallery;
