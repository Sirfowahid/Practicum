import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    checkIn: {
        type: Date,
        required: false,
        default: null
    },
    checkOut: {
        type: Date,
        required: false,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['Confirmed', 'Pending', 'Cancelled'], 
        default: 'Pending'
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
