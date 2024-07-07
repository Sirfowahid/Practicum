import asyncHandler from "express-async-handler";

// GET -> /bookings
const getBookings = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get Bookings'
    });
});

// GET -> /bookings/:id
const getBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id; // Ensure parameter name matches route
    res.status(200).json({
        message: `Get Booking By ID: ${bookingId}`
    });
});

// POST -> /bookings/addbooking
const addBooking = asyncHandler(async (req, res) => {
    const bookingData = req.body; // Access the data from the request body
    res.status(201).json({
        message: 'Booking Added',
        data: bookingData
    });
});

// PUT -> /bookings/updatebooking/:id
const updateBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id; // Ensure parameter name matches route
    const updateData = req.body; // Access the data from the request body
    res.status(200).json({
        message: `Update Booking with ID: ${bookingId}`,
        data: updateData
    });
});

export {
    getBookings,
    getBooking,
    addBooking,
    updateBooking
};
