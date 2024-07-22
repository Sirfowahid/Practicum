import React from 'react'
import { useGetBookingsQuery } from '../slices/bookingsApiSlice'
const DebugBookings = () => {
    const { data, isLoading, error }= useGetBookingsQuery();
    console.log(isLoading)
    console.log(data)
  return (
    <div>DebugBookings</div>
  )
}

export default DebugBookings