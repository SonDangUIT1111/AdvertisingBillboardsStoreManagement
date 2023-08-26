import express from "express"
import * as ServicePricesController from "../controllers/priceService"

const router = express.Router();

router.get("/", ServicePricesController.getServicePrices);

router.get("/:serviceId", ServicePricesController.getServicePrice)

router.patch("/:serviceId", ServicePricesController.updateServicePrice)

export default router;