import asyncHandler from "express-async-handler";
import Billing from "../models/billingsModel.js"; // Adjust the import path based on your project structure

// GET -> /billings
const getBillings = asyncHandler(async (req, res) => {
    try {
        const billings = await Billing.find({}); // Fetch all billings from the database
        res.status(200).json({
            message: 'Get Billings',
            billings: billings
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch billings',
            error: error.message
        });
    }
});

// GET -> /billings/:id
const getBilling = asyncHandler(async (req, res) => {
    const billingId = req.params.id;
    try {
        const billing = await Billing.findById(billingId); // Fetch billing by ID from the database
        if (billing) {
            res.status(200).json({
                message: `Get Billing By ID: ${billingId}`,
                billing: billing
            });
        } else {
            res.status(404).json({
                message: 'Billing not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch billing',
            error: error.message
        });
    }
});

// POST -> /billings/addbilling
const addBilling = asyncHandler(async (req, res) => {
    const billingData = req.body;
    try {
        const newBilling = await Billing.create(billingData); // Create a new billing entry in the database
        res.status(201).json({
            message: 'Billing Added',
            data: newBilling
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to add billing',
            error: error.message
        });
    }
});

// PUT -> /billings/updatebilling/:id
const updateBilling = asyncHandler(async (req, res) => {
    const billingId = req.params.id;
    const updateData = req.body;
    try {
        const updatedBilling = await Billing.findByIdAndUpdate(billingId, updateData, { new: true }); // Update billing entry in the database
        if (updatedBilling) {
            res.status(200).json({
                message: `Update Billing with ID: ${billingId}`,
                data: updatedBilling
            });
        } else {
            res.status(404).json({
                message: 'Billing not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update billing',
            error: error.message
        });
    }
});

export {
    getBillings,
    getBilling,
    addBilling,
    updateBilling
};
