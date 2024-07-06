import express from "express"
const router = express.Router();

import {
    getUsers,
    getUser,
} from '../controllers/usersController.js'

router.get('/',getUsers)
router.get('/:userId',getUser)

export default router;