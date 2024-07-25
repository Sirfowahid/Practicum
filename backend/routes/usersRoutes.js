import express from "express";
const router = express.Router();

import {
    authUser,
    logoutUser,
    getUsers,
    getUser,
    addUser,
    updateUser
} from '../controllers/usersController.js';

import { protect } from "../middleware/authMiddleware.js";

router.get('/', getUsers); // GET -> /users
router.get('/:id',protect,  getUser); // GET -> /users/:id
router.post('/adduser', addUser); // POST -> /users/adduser
router.put('/updateuser/:id',protect,  updateUser); // Ensure route parameter is consistent with the controller
router.post('/auth', authUser); // POST -> /users/auth
router.post('/logout', logoutUser) // POST -> /users/logout 

export default router;
