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

router.get('/', getUsers); 
router.get('/:id',  getUser); 
router.post('/adduser', addUser); 
router.put('/updateuser/:id',  updateUser); 
router.post('/auth', authUser); 
router.post('/logout', logoutUser) 

export default router;
