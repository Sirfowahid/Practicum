import React from 'react'
import { useParams } from 'react-router-dom'
const AdminUpdateRoom = () => {
  const {roomId} = useParams();
  return (
    <div>AdminUpdateRoom {roomId}</div>
  )
}

export default AdminUpdateRoom