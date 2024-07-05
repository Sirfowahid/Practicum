import express from "express"
const router = express.Router();

import {
    getRooms,
    getRoom,
    addRoom,
    updateRoom
} from '../controllers/roomsController.js'

router.get('/',getRooms)
router.get('/:roomId',getRoom)
router.post('/addroom',addRoom)
router.put('/updaterooms/:roomId',updateRoom)

export default router;