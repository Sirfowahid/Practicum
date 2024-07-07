import asyncHandler from "express-async-handler";
import Booking from "../models/bookingsModel.js"; // Adjust the import path based on your project structure

// GET -> /bookings
const getBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Booking.find({}); // Fetch all bookings from the database
        res.status(200).json({
            message: 'Get Bookings',
            bookings: bookings
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
});

// GET -> /bookings/:id
const getBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id;
    try {
        const booking = await Booking.findById(bookingId); // Fetch booking by ID from the database
        if (booking) {
            res.status(200).json({
                message: `Get Booking By ID: ${bookingId}`,
                booking: booking
            });
        } else {
            res.status(404).json({
                message: 'Booking not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
});

// POST -> /bookings/addbooking
const addBooking = asyncHandler(async (req, res) => {
    const bookingData = req.body;
    try {
        const newBooking = await Booking.create(bookingData); // Create a new booking in the database
        res.status(201).json({
            message: 'Booking Added',
            data: newBooking
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to add booking',
            error: error.message
        });
    }
});

// PUT -> /bookings/updatebooking/:id
const updateBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id;
    const updateData = req.body;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true }); // Update booking in the database
        if (updatedBooking) {
            res.status(200).json({
                message: `Update Booking with ID: ${bookingId}`,
                data: updatedBooking
            });
        } else {
            res.status(404).json({
                message: 'Booking not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update booking',
            error: error.message
        });
    }
});

export {
    getBookings,
    getBooking,
    addBooking,
    updateBooking
};
