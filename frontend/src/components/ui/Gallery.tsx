import React from 'react'
import ImgCard from './ImgCard';
interface Props {
    images: string[];
    title:string;
    description:string;
  }
const Gallery = ({images,title,description}:Props) => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <ImgCard key={index} src={image}/>
      ))}
    </div>
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <p className="text-lg text-gray-700">{description}</p>
    </>
  )
}

export default Gallery