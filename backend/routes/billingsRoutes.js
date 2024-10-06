import express from "express";
import {
  getBillings,
  getBilling,
  addBilling,
  updateBilling,
  handleSSLCOMMERZSuccess,
  handleSSLCOMMERZFail,
  handleSSLCOMMERZCancel,
} from "../controllers/billingsController.js";

const router = express.Router();

router.get("/", getBillings);
router.get("/:id", getBilling);
router.post("/addbilling", addBilling);
router.put("/updatebilling/:id", updateBilling);
router.post("/success/:id", handleSSLCOMMERZSuccess);
router.post("/fail/:id", handleSSLCOMMERZFail);
router.post("/cancel/:id", handleSSLCOMMERZCancel);

export default router;
