import express from "express"
import * as OtherBillsController from "../controllers/billOther"

const router = express.Router();

router.get("/", OtherBillsController.getOtherBills);

router.get("/:billId", OtherBillsController.getOtherBill)

router.post("/", OtherBillsController.createOtherBill)

router.patch("/:billId", OtherBillsController.updateOtherBill)

router.delete("/:billId", OtherBillsController.deleteOtherBill)

export default router;