import asyncHandler from "express-async-handler";
import Room from "../models/roomsModel.js"
// GET -> /rooms
const getRooms = asyncHandler(async (req, res) => {
    try {
        const rooms = await Room.find({}); // Fetch all rooms from the database
        res.status(200).json({
            message: 'Get Rooms',
            rooms: rooms
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch rooms',
            error: error.message
        });
    }
});

// GET -> /rooms/:id
const getRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.id;
    try {
        const room = await Room.findById(roomId); // Fetch room by ID from the database
        if (room) {
            res.status(200).json({
                message: `Get Room By ID: ${roomId}`,
                room: room
            });
        } else {
            res.status(404).json({
                message: 'Room not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch room',
            error: error.message
        });
    }
});

// POST -> /rooms/addroom
const addRoom = asyncHandler(async (req, res) => {
    const roomData = req.body;
    try {
        const newRoom = await Room.create(roomData); // Create a new room in the database
        res.status(201).json({
            message: 'Room Added',
            data: newRoom
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to add room',
            error: error.message
        });
    }
});

// PUT -> /rooms/updateroom/:id
const updateRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.id;
    const updateData = req.body;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData, { new: true }); // Update room in the database
        if (updatedRoom) {
            res.status(200).json({
                message: `Update Room with ID: ${roomId}`,
                data: updatedRoom
            });
        } else {
            res.status(404).json({
                message: 'Room not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update room',
            error: error.message
        });
    }
});

export {
    getRooms,
    getRoom,
    addRoom,
    updateRoom
};
