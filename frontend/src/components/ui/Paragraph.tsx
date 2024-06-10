import React, { ReactNode } from 'react'
interface Props {
    children:ReactNode
}
const Paragraph = ({children}:Props) => {
  return (
    <p>{children}</p>
  )
}

export default Paragraph