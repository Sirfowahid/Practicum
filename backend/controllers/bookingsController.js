import asyncHandler from "express-async-handler";

// GET -> /
const getBookings = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Get Boookings'
            }
        )
    }
)

// GET -> 
const getUser = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Get Bookings By ID'
            }
        )
    }
)

export {
    getUsers,
    getUser
}