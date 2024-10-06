import asyncHandler from "express-async-handler";
import Billing from "../models/billingsModel.js";
import Booking from "../models/bookingsModel.js";
import { initialPaymentSession } from "../utils/sslcommerzService.js";

const getBillings = asyncHandler(async (req, res) => {
    try {
        const billings = await Billing.find({});
        res.status(200).json({
            message: 'Get Billings',
            billings,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch billings',
            error: error.message,
        });
    }
});

const getBilling = asyncHandler(async (req, res) => {
    const billingId = req.params.id;
    try {
        const billing = await Billing.findById(billingId);
        if (billing) {
            res.status(200).json({
                message: `Get Billing By ID: ${billingId}`,
                billing,
            });
        } else {
            res.status(404).json({
                message: 'Billing not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch billing',
            error: error.message,
        });
    }
});

const addBilling = asyncHandler(async (req, res) => {
    const billingData = req.body;
    try {
        const newBilling = await Billing.create(billingData);
        const paymentResponse = await initialPaymentSession(newBilling);

        if (paymentResponse.success) {
            res.status(200).json({
                message: 'Billing added and payment session created',
                payment_url: paymentResponse.payment_url,
                data:newBilling
            });
        } else {
            res.status(500).json({
                message: 'Billing added, but payment session creation failed',
                error: paymentResponse.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to add billing',
            error: error.message,
        });
    }
});

const updateBilling = asyncHandler(async (req, res) => {
    const billingId = req.params.id;
    const updateData = req.body;
    try {
        const updatedBilling = await Billing.findByIdAndUpdate(billingId, updateData, { new: true });
        if (updatedBilling) {
            res.status(200).json({
                message: `Update Billing with ID: ${billingId}`,
                data: updatedBilling,
            });
        } else {
            res.status(404).json({
                message: 'Billing not found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update billing',
            error: error.message,
        });
    }
});

const handleSSLCOMMERZSuccess = asyncHandler(async (req, res) => {
    
    const {user} = req.query;
    const id = req.params.id;

    try {
        const updatedBilling = await Billing.findByIdAndUpdate(
            id,
            {
                paymentStatus: "Success",
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (updatedBilling) {
            res.redirect(`http://localhost:5173/user/profile/${user}`);
            res.status(200).json({
                message: "Payment successful, paymentStatus updated",
                updatedBilling,
            });
        } else {
            res.status(404).json({
                message: "Billing not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating billing after payment",
            error: error.message,
        });
    }
});

const handleSSLCOMMERZFail = asyncHandler(async (req, res) => {
   
    const {booking} = req.query;
    
    const id = req.params.id;

    try {
        const deletedBilling = await Billing.findByIdAndDelete(id);
        const deleteBooking = await Booking.findByIdAndDelete(booking)

        if (deletedBilling && deleteBooking) {
            res.redirect(`http://localhost:5173/user/rooms`);
        } else {
            res.status(404).json({
                message: "Billing data not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting billing after payment failure",
            error: error.message,
        });
    }
});

const handleSSLCOMMERZCancel = asyncHandler(async (req, res) => {
    const transactionInfo = req.body;
    const id = req.params.id;

    try {
        const deletedBilling = await Billing.findByIdAndDelete(id);

        if (deletedBilling) {
            res.redirect("http://localhost:5173/user/rooms");
        } else {
            res.status(404).json({
                message: "Billing data not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting billing after cancellation",
            error: error.message,
        });
    }
});

export {
    getBillings,
    getBilling,
    addBilling,
    updateBilling,
    handleSSLCOMMERZSuccess,
    handleSSLCOMMERZFail,
    handleSSLCOMMERZCancel,
};
