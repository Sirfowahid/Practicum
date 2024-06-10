import React, { ReactNode } from 'react'
interface Props {
    children:ReactNode
}
const Heading = ({children}:Props) => {
  return (
    <h2 className="text-3xl font-bold mb-4">{children}</h2>
  )
}

export default Heading