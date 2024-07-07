import asyncHandler from "express-async-handler";

// GET -> /rooms
const getRooms = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get Rooms'
    });
});

// GET -> /rooms/:id
const getRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.id; // Ensure parameter name matches route
    res.status(200).json({
        message: `Get Room By ID: ${roomId}`
    });
});

// POST -> /rooms/addroom
const addRoom = asyncHandler(async (req, res) => {
    const roomData = req.body; // Access the data from the request body
    res.status(201).json({
        message: 'Add New Room',
        data: roomData
    });
});

// PUT -> /rooms/updateroom/:id
const updateRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.id; // Ensure parameter name matches route
    const updateData = req.body; // Access the data from the request body
    res.status(200).json({
        message: `Update Room with ID: ${roomId}`,
        data: updateData
    });
});

export {
    getRooms,
    getRoom,
    addRoom,
    updateRoom
};
