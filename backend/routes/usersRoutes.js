import express from "express";
const router = express.Router();

import {
    getUsers,
    getUser,
    addUser
} from '../controllers/usersController.js';

router.get('/', getUsers);
router.get('/:id', getUser); // Ensure route parameter is consistent with the controller
router.post('/adduser', addUser);

export default router;
