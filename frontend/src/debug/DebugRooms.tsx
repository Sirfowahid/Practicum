import React from 'react';
import { useGetRoomsQuery } from '../slices/roomsApiSlice';
const DebugRooms: React.FC = () => {
    const { data: rooms, error, isLoading } = useGetRoomsQuery();
    console.log(rooms)
    console.log(isLoading)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading rooms</div>;

    return (
        <div>
            <h1>DebugRooms</h1>
            
        </div>
    );
};

export default DebugRooms;
