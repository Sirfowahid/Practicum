import mongoose from 'mongoose';

const billingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Bkash', 'Nagad', 'Rocket','Card' ], 
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    paymentStatus:{
        type:String,
        enum:['Success','Failed'],
        required:true
    }
}, {
    timestamps: true
});

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;
