import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/usersModel.js";

// POST -> /users/auth
const authUser = asyncHandler(async(req, res) => {
    // console.log(req.body)
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if (user && await user.matchPassword(password)) {
        generateToken(res,user._id)
        res.status(201).json({
            message: 'Valid User',
            data: user
        });
    }else{
        res.status(400);
        throw new Error('Invalid User Information')
    }

});

// POST -> /users/logout
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({
        message: "Logout User"
    })
});


// GET -> /users
const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({}); // Fetch all users from the database
        res.status(200).json({
            message: 'Get Users',
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch users',
            error: error.message
        });
    }
});

// GET -> /users/:id
const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId); // Fetch user by ID from the database
        if (user) {
            res.status(200).json({
                message: `Get User By ID: ${userId}`,
                user: user
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch user',
            error: error.message
        });
    }
});

// POST -> /users/adduser
const addUser = asyncHandler(async (req, res) => {
    const userData = req.body;
    try { 
        const newUser = await User.create(userData); // Create a new user in the database
        generateToken(res,newUser._id) 
        res.status(201).json({
            message: 'User Added',
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to add user',
            error: error.message
        });
    }
});

// PUT -> /users/updateuser/:id
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }); // Update user in the database
        if (updatedUser) {
            res.status(200).json({
                message: `Update User with ID: ${userId}`,
                data: updatedUser
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update user',
            error: error.message
        });
    }
});

export {
    authUser,
    logoutUser,
    getUsers,
    getUser,
    addUser,
    updateUser
};
