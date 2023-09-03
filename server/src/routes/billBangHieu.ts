import express from "express"
import * as BangHieuBillsController from "../controllers/billBangHieu"

const router = express.Router();

router.get("/", BangHieuBillsController.getBangHieuBills);

router.get("/:billId", BangHieuBillsController.getBangHieuBill)

router.post("/", BangHieuBillsController.createBangHieuBill)

router.patch("/:billId", BangHieuBillsController.updateBangHieuBill)

router.delete("/:billId", BangHieuBillsController.deleteBangHieuBill)

export default router;