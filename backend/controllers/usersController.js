import asyncHandler from "express-async-handler";

// GET -> /users
const getUsers = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get Users'
    });
});

// GET -> /users/:id
const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id; // Ensure parameter name matches route
    res.status(200).json({
        message: `Get User By ID: ${userId}`
    });
});

// POST -> /users/adduser
const addUser = asyncHandler(async (req, res) => {
    const userData = req.body; // Access the data from the request body
    res.status(201).json({
        message: 'User Added',
        data: userData
    });
});

export {
    getUsers,
    getUser,
    addUser
};
