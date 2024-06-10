import React from 'react'
interface Props {
    src: string;
    name: string;
    description: string;
  }
const TeamMemberImgCard = ({ src, name, description }:Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
    <img src={src} alt={name} className="w-full h-auto rounded-full mb-4" />
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
  )
}

export default TeamMemberImgCard