import express from "express";
const router = express.Router();

import {
    getBillings,
    getBilling,
    addBilling,
    updateBilling
} from '../controllers/billingsController.js';

router.get('/', getBillings);
router.get('/:id', getBilling); // Ensure route parameter is consistent with the controller
router.post('/addbilling', addBilling);
router.put('/updatebilling/:id', updateBilling); // Ensure route parameter is consistent with the controller

export default router;
