import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import decalBillsRoutes from "./routes/billDecal"
import bangRonBillsRoutes from "./routes/billBangRon"
import bangHieuBillsRoutes from "./routes/billBangHieu"
import otherBillsRoutes from "./routes/billOther"
import servicePriceRoutes from "./routes/priceService"
import customerRoutes from "./routes/customer"
import revenueRoutes from "./routes/revenue"
import importMaterialRecordRoutes from "./routes/importMaterialRecord";
import morgan from "morgan"
import createHttpError, {isHttpError} from "http-errors";

const app = express();

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/servicePrices", servicePriceRoutes);

app.use("/api/decalBills", decalBillsRoutes);

app.use("/api/bangRonBills", bangRonBillsRoutes);

app.use("/api/bangHieuBills", bangHieuBillsRoutes);

app.use("/api/otherBills", otherBillsRoutes);

app.use("/api/importMaterialRecords",importMaterialRecordRoutes)

app.use("/api/customers", customerRoutes);

app.use("/api/revenues", revenueRoutes);

app.use((req, res, next) => {
    next(createHttpError(404,"Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next:NextFunction)=> {
    console.error(error);
    let errorMessage = "An unknown error occured";
    let statusCode = 500;
    if ( isHttpError(error) )
    {
        statusCode = error.status;
        errorMessage = error.message;
    } 
    res.status(statusCode).json({error:errorMessage})
});

export default app;