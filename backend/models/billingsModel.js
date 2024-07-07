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
    paymentMethod: {
        type: String,
        enum: ['Bkash', 'Nagad', 'Rocket', ], 
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
    }
}, {
    timestamps: true
});

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;
