import React from 'react'
import { useGetUsersQuery } from '../slices/usersApiSlice'
const DebugUsers = () => {
    const { data, isLoading, error } = useGetUsersQuery();
    console.log(isLoading)
    console.log(data)
  return (
    <div>DebugUsers</div>
  )
}

export default DebugUsers