import React from 'react'
export interface Props {
    src: string;
    caption?: string;
  }
const ImgCard = ({ src, caption }:Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={src} alt="Card" className="w-full h-auto rounded-lg mb-2" />
      {caption && <p className="text-sm text-gray-600">{caption}</p>}
    </div>
  )
}

export default ImgCard