import express from "express";
const router = express.Router();

import {
    getBookings,
    getBooking,
    addBooking,
    updateBooking
} from '../controllers/bookingsController.js';

router.get('/', getBookings);
router.get('/:id', getBooking); 
router.post('/addbooking', addBooking);
router.put('/updatebooking/:id', updateBooking); 

export default router;
