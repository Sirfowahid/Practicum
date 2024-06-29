import React from 'react'
import { useParams } from 'react-router-dom'
const AdminUserProfile = () => {
  const {userId}= useParams()
  return (
    <div>AdminUserProfile {userId}</div>
  )
}

export default AdminUserProfile