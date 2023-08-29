import express from "express"
import * as RevenueController from "../controllers/revenue"

const router = express.Router();

router.get("/", RevenueController.getRevenues);

router.get("/:monthParam/:yearParam", RevenueController.getRevenue)

router.post("/", RevenueController.createRevenue)

router.patch("/:monthParam/:yearParam", RevenueController.updateRevenue)


export default router;