import express from "express"
import * as CustomerController from "../controllers/customer"

const router = express.Router();

router.get("/", CustomerController.getCustomers);

router.get("/:customerId", CustomerController.getCustomer)

router.post("/", CustomerController.createCustomer)

router.patch("/:customerId", CustomerController.updateCustomer)


export default router;