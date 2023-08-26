import express from "express"
import * as DecalBillsController from "../controllers/billDecal"

const router = express.Router();

router.get("/", DecalBillsController.getDecalBills);

router.get("/:billId", DecalBillsController.getDecalBill)

router.post("/", DecalBillsController.createDecalBill)

router.patch("/:billId", DecalBillsController.updateDecalBill)

router.delete("/:billId", DecalBillsController.deleteDecalBill)

export default router;