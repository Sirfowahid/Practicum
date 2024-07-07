import express from "express";
const router = express.Router();

import {
    getBookings,
    getBooking,
    addBooking
} from '../controllers/bookingsController.js';

router.get('/', getBookings);
router.get('/:id', getBooking); // Ensure route parameter is consistent with the controller
router.post('/addbooking', addBooking);

export default router;
