import React, { ReactNode } from 'react'
interface Props {
    children:ReactNode
}
const Title = ({children}:Props) => {
  return (
    <h1 className='font-bold text-5xl my-6 text-center text-secondary'>{children}</h1>
  )
}

export default Title