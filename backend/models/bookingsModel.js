import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    roomNumber: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Confirmed', 'Pending', 'Cancelled'], // Possible values for status
        default: 'Pending'
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
