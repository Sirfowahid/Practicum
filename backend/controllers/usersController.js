import asyncHandler from "express-async-handler";

// GET -> /
const getUsers = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Get Users'
            }
        )
    }
)

// GET 
const getUser = asyncHandler(
    async (req,res)=> {
        res.status(200).json(
            {
                message: 'Get User By ID'
            }
        )
    }
)

export {
    getUsers,
    getUser
}