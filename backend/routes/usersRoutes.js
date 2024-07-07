import express from "express";
const router = express.Router();

import {
    getUsers,
    getUser,
    addUser,
    updateUser
} from '../controllers/usersController.js';

router.get('/', getUsers); // GET -> /users
router.get('/:id', getUser); // GET -> /users/:id
router.post('/adduser', addUser); // POST -> /users/adduser
router.put('/updateuser/:id', updateUser); // Ensure route parameter is consistent with the controller

export default router;
