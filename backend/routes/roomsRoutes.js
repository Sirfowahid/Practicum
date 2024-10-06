
import express from "express";
const router = express.Router();

import {
    getRooms,
    getRoom,
    addRoom,
    updateRoom
} from '../controllers/roomsController.js';

router.get('/', getRooms);
router.get('/:id', getRoom); 
router.post('/addroom', addRoom);
router.put('/updateroom/:id', updateRoom);

export default router;
