import asyncHandler from "express-async-handler";

// GET -> /users
const getUsers = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get Users'
    });
});

// GET -> /users/:id
const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    res.status(200).json({
        message: `Get User By ID: ${userId}`
    });
});

// POST -> /users/adduser
const addUser = asyncHandler(async (req, res) => {
    const userData = req.body;
    res.status(201).json({
        message: 'User Added',
        data: userData
    });
});

// PUT -> /users/updateuser/:id
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    res.status(200).json({
        message: `Update User with ID: ${userId}`,
        data: updateData
    });
});

export {
    getUsers,
    getUser,
    addUser,
    updateUser
};
