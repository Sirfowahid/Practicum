import asyncHandler from "express-async-handler";

// GET -> /billings
const getBillings = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get Billings'
    });
});

// GET -> /billings/:id
const getBilling = asyncHandler(async (req, res) => {
    const billingId = req.params.id; // Ensure parameter name matches route
    res.status(200).json({
        message: `Get Billing By ID: ${billingId}`
    });
});

// POST -> /billings/addbilling
const addBilling = asyncHandler(async (req, res) => {
    const billingData = req.body; // Access the data from the request body
    res.status(201).json({
        message: 'Billing Added',
        data: billingData
    });
});

// PUT -> /billings/updatebooking/:id
const updateBilling = asyncHandler(async (req, res) => {
    const billingId = req.params.id; // Ensure parameter name matches route
    const updateData = req.body; // Access the data from the request body
    res.status(200).json({
        message: `Update Billing with ID: ${billingId}`,
        data: updateData
    });
});

export {
    getBillings,
    getBilling,
    addBilling,
    updateBilling
};
