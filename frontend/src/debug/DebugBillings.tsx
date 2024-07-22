import React from 'react'
import { useGetBillingsQuery } from '../slices/billingsApiSlice'
const DebugBillings = () => {
    const { data, isLoading, error } = useGetBillingsQuery();
    console.log(isLoading)
    console.log(data)
  return (
    <div>DebugBillings</div>
  )
}

export default DebugBillings