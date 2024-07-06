import express from "express"
const router = express.Router();

import {
    getBookings,
    getBooking,
} from '../controllers/bookingsController.js'

router.get('/',getBookings)
router.get('/:bookingId',getBooking)

export default router;