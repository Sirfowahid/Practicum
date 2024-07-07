import express from "express";
const router = express.Router();

import {
    getBookings,
    getBooking,
    addBooking,
    updateBooking
} from '../controllers/bookingsController.js';

router.get('/', getBookings);
router.get('/:id', getBooking); // Ensure route parameter is consistent with the controller
router.post('/addbooking', addBooking);
router.put('/updatebooking/:id', updateBooking); // Ensure route parameter is consistent with the controller

export default router;
