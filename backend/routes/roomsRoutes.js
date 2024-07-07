
import express from "express";
const router = express.Router();

import {
    getRooms,
    getRoom,
    addRoom,
    updateRoom
} from '../controllers/roomsController.js';

router.get('/', getRooms);
router.get('/:id', getRoom); // Ensure route parameter is consistent with the controller
router.post('/addroom', addRoom);
router.put('/updateroom/:id', updateRoom); // Ensure route parameter is consistent with the controller

export default router;
