import React from 'react'
import { useParams } from 'react-router-dom'
const AdminProfile = () => {
  const {adminId} = useParams();
  return (

    <div>AdminProfile {adminId}</div>
  )
}

export default AdminProfile