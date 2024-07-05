import asyncHandler from "express-async-handler";

// GET -> user/rooms
const getRooms = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Get Rooms'
            }
        )
    }
)

// GET -> user/rooms/:roomId
const getRoom = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Get Room By ID'
            }
        )
    }
)

// POST -> admin/addroom
const addRoom = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Add New Room'
            }
        )
    }
)

// POST -> admin/addroom
const updateRoom = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Update Room'
            }
        )
    }
)

export {
    getRooms,
    getRoom,
    addRoom,
    updateRoom
}