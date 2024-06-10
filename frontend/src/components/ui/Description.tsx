import React, { ReactNode } from 'react'
interface Props {
    children:ReactNode
}
const Description = ({children}:Props) => {
  return (
    <p className="text-lg text-gray-700">{children}</p>
  )
}

export default Description
