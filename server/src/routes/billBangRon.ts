import express from "express"
import * as BangRonBillsController from "../controllers/billBangRon"

const router = express.Router();

router.get("/", BangRonBillsController.getBangRonBills);

router.get("/:billId", BangRonBillsController.getBangRonBill)

router.post("/", BangRonBillsController.createBangRonBill)

router.patch("/:billId", BangRonBillsController.updateBangRonBill)

router.delete("/:billId", BangRonBillsController.deleteBangRonBill)

export default router;